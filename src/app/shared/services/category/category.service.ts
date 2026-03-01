// src/app/services/category.service.ts
import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, updateDoc, deleteDoc, doc, query, where, serverTimestamp } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth'; // Auth para obtener el UID del usuario
import { Observable, switchMap, of, take } from 'rxjs'; // take para completar el observable después de un valor
import { map } from 'rxjs/operators';
import { Category } from 'src/app/interfaces/category.interface';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private firestore: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);
  private categoriesCollection = collection(this.firestore, 'categories');

  constructor() {}

  getAllCategories(): Observable<Category[]> {
    return user(this.auth).pipe(
      switchMap(currentUser => {
        if (currentUser && currentUser.uid) {
          const q = query(this.categoriesCollection, where('userId', '==', currentUser.uid));
          return collectionData(q, { idField: 'id' }).pipe(
            map(categories => categories as Category[])
          );
        } else {
          return of([]);
        }
      })
    );
  }
  async addCategory(name: string, color: string): Promise<void> {
    const currentUser = await user(this.auth).pipe(map(u => u?.uid), take(1)).toPromise();

    if (!currentUser) {
      throw new Error('Usuario no autenticado. No se puede agregar la categoría.');
    }

    const newCategory: Omit<Category, 'id'> = {
      userId: currentUser,
      name: name,
      color: color,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await addDoc(this.categoriesCollection, newCategory);
  }


  async updateCategory(category: Partial<Category> & { id: string }): Promise<void> {
    if (!category.id) {
      throw new Error('El ID de la categoría es necesario para actualizarla.');
    }
    // Obtiene una referencia al documento de la categoría por su ID.
    const categoryDocRef = doc(this.firestore, `categories/${category.id}`);

    // Actualiza los campos proporcionados en el objeto 'category'.
    // 'Partial<Category>' permite enviar solo los campos que se desean modificar.
    await updateDoc(categoryDocRef, category);
  }

  /**
   * DELETE: Elimina una categoría por su ID.
   * @param categoryId El ID de la categoría a eliminar.
   */
  async deleteCategory(categoryId: string): Promise<void> {
    // Obtiene una referencia al documento de la categoría que se desea eliminar.
    const categoryDocRef = doc(this.firestore, `categories/${categoryId}`);
    // Elimina el documento de Firestore.
    await deleteDoc(categoryDocRef);
  }
}
