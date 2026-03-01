// src/app/shared/services/task/task.service.ts
import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  Timestamp,
  FieldValue // <<-- ¡IMPORTANTE: Importar FieldValue!
} from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { Observable, switchMap, of, take } from 'rxjs';
import { map } from 'rxjs/operators';

// Importa la interfaz Task y el enum TaskStatus desde tu archivo de interfaces
import { Task, TaskStatus } from '../../../features/todo/domain/entities/task.entity';

// --- TIPOS AUXILIARES PARA ESCRITURA EN FIRESTORE ---

// Este tipo representa la estructura de una Tarea cuando se VA A ESCRIBIR en Firestore.
// Permite que 'createdAt' y 'updatedAt' sean FieldValue (como serverTimestamp()),
// además de Date o Timestamp (que Firestore también puede convertir).
// Excluye 'id' porque Firestore lo genera al añadir y no se envía al actualizar el documento.
export type TaskDataForFirestore = Omit<Task, 'id' | 'createdAt' | 'updatedAt'> & {
  createdAt: Date | Timestamp | FieldValue;
  updatedAt: Date | Timestamp | FieldValue;
};
// Tipo específico para el payload de creación (omite 'id' del todo)
export type TaskCreatePayload = TaskDataForFirestore;

// Tipo específico para el payload de actualización (puede ser parcial)
export type TaskUpdatePayload = Partial<TaskDataForFirestore>;


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private firestore: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);
  private tasksCollection = collection(this.firestore, 'tasks');

  // Función auxiliar para convertir Timestamps de Firestore a objetos Date
  private convertTimestampsToDates(task: any): Task {
    return {
      ...task,
      createdAt: task.createdAt instanceof Timestamp ? task.createdAt.toDate() : task.createdAt,
      updatedAt: task.updatedAt instanceof Timestamp ? task.updatedAt.toDate() : task.updatedAt,
    } as Task;
  }

  constructor() {}

  getTasks(): Observable<Task[]> {
    return user(this.auth).pipe(
      switchMap(currentUser => {
        if (currentUser && currentUser.uid) {
          const q = query(this.tasksCollection, where('userId', '==', currentUser.uid));
          return collectionData(q, { idField: 'id' }).pipe(
            map(tasks => tasks.map(this.convertTimestampsToDates))
          );
        } else {
          return of([]);
        }
      })
    );
  }

  // Método addTask: Ahora usa TaskCreatePayload
  async addTask(
    title: string,
    description?: string,
    categoryId?: string,
    status?: string
  ): Promise<void> {
    const currentUser = await user(this.auth).pipe(map(u => u?.uid), take(1)).toPromise();

    if (!currentUser) {
      throw new Error('Usuario no autenticado. No se puede agregar la tarea.');
    }

    const newTask: TaskCreatePayload = { // Usamos el tipo TaskCreatePayload aquí
      userId: currentUser,
      title: title,
      description: description, // description puede ser undefined, lo cual es válido
      status: (status as TaskStatus) || TaskStatus.NEW,
      categoryId: categoryId,
      completed: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    await addDoc(this.tasksCollection, newTask);
  }

  // Método updateTask: Ahora usa TaskUpdatePayload
  async updateTask(task: Partial<Task> & { id: string }): Promise<void> {
    if (!task.id) {
      throw new Error('El ID de la tarea es necesario para actualizarla.');
    }
    const taskDocRef = doc(this.firestore, `tasks/${task.id}`);

    // Construimos el payload de actualización.
    // Usamos Object.assign para copiar las propiedades y luego sobrescribir/eliminar si es necesario.
    const updatePayload: any = Object.assign({}, task);

    // Eliminamos 'id' y 'createdAt' si existen, ya que no se deben enviar en un updateDoc
    // 'id' es parte de la URL, 'createdAt' no se debe cambiar
    delete updatePayload.id;
    delete updatePayload.createdAt;

    // Aseguramos que 'updatedAt' se actualiza con la marca de tiempo del servidor
    updatePayload.updatedAt = serverTimestamp();

    await updateDoc(taskDocRef, updatePayload);
  }

  // Métodos específicos para actualizar el estado y completado
  // También usan TaskUpdatePayload
  async updateTaskStatus(taskId: string, newStatus: TaskStatus): Promise<void> {
    const taskDocRef = doc(this.firestore, `tasks/${taskId}`);
    const updatePayload: TaskUpdatePayload = {
      status: newStatus,
      updatedAt: serverTimestamp()
    };
    await updateDoc(taskDocRef, updatePayload);
  }

  async markTaskAsCompleted(taskId: string, completed: boolean): Promise<void> {
    const taskDocRef = doc(this.firestore, `tasks/${taskId}`);
    const updatePayload: TaskUpdatePayload = {
      completed: completed,
      updatedAt: serverTimestamp()
    };
    await updateDoc(taskDocRef, updatePayload);
  }

  async deleteTask(taskId: string): Promise<void> {
    const taskDocRef = doc(this.firestore, `tasks/${taskId}`);
    await deleteDoc(taskDocRef);
  }
}
