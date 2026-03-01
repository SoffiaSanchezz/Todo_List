import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Task, TaskStatus } from '../../domain/entities/task.entity';
import { TaskRepository } from '../../domain/repositories/task.repository';
import { LocalStorageDatasource } from '../datasources/local-storage.datasource';

const TASK_COLLECTION = 'tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskImplementationRepository extends TaskRepository {
  constructor(private localStorageDatasource: LocalStorageDatasource) {
    super();
  }

  getAllTasks(): Observable<Task[]> {
    return this.localStorageDatasource.getAll<Task>(TASK_COLLECTION).pipe(
      // Ensure dates are re-hydrated if needed, as localStorage stores them as strings
      map(tasks => tasks.map(task => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt)
      })))
    );
  }

  getTaskById(id: string): Observable<Task | undefined> {
    return this.localStorageDatasource.getById<Task>(TASK_COLLECTION, id).pipe(
      map(task => task ? {
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt)
      } : undefined)
    );
  }

  createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completed'>): Observable<Task> {
    const now = new Date();
    const newTask: Task = {
      ...task,
      status: task.status || TaskStatus.NEW, // Default status
      completed: false, // Default to not completed
      createdAt: now,
      updatedAt: now,
    } as Task;
    return this.localStorageDatasource.create<Task>(TASK_COLLECTION, newTask);
  }

  updateTask(task: Task): Observable<Task> {
    const updatedTask: Task = {
      ...task,
      updatedAt: new Date(),
    };
    return this.localStorageDatasource.update<Task>(TASK_COLLECTION, updatedTask);
  }

  deleteTask(id: string): Observable<void> {
    return this.localStorageDatasource.delete(TASK_COLLECTION, id);
  }

  changeTaskStatus(id: string, status: TaskStatus): Observable<Task> {
    return this.getTaskById(id).pipe(
      map(task => {
        if (!task) throw new Error(`Tarea con ID ${id} no encontrada.`);
        const updatedTask = { ...task, status, updatedAt: new Date() };
        if (status === TaskStatus.COMPLETED) {
          updatedTask.completed = true;
        } else {
          updatedTask.completed = false;
        }
        return updatedTask;
      }),
      (obs) => new Observable(subscriber => { // Re-wrapping to handle inner update observable
        obs.subscribe({
          next: (updatedTask) => {
            this.localStorageDatasource.update(TASK_COLLECTION, updatedTask).subscribe({
              next: () => {
                subscriber.next(updatedTask);
                subscriber.complete();
              },
              error: (err) => subscriber.error(err)
            });
          },
          error: (err) => subscriber.error(err)
        });
      })
    );
  }

  markTaskAsCompleted(id: string, completed: boolean): Observable<Task> {
    return this.getTaskById(id).pipe(
      map(task => {
        if (!task) throw new Error(`Tarea con ID ${id} no encontrada.`);
        const updatedTask = { ...task, completed, updatedAt: new Date() };
        if (completed) {
          updatedTask.status = TaskStatus.COMPLETED;
        }
        return updatedTask;
      }),
      (obs) => new Observable(subscriber => { // Re-wrapping to handle inner update observable
        obs.subscribe({
          next: (updatedTask) => {
            this.localStorageDatasource.update(TASK_COLLECTION, updatedTask).subscribe({
              next: () => {
                subscriber.next(updatedTask);
                subscriber.complete();
              },
              error: (err) => subscriber.error(err)
            });
          },
          error: (err) => subscriber.error(err)
        });
      })
    );
  }

  filterTasksByCategory(categoryId: string | null): Observable<Task[]> {
    return this.getAllTasks().pipe(
      map(tasks => {
        if (categoryId === null) {
          return tasks;
        }
        return tasks.filter(task => task.categoryId === categoryId);
      })
    );
  }
}
