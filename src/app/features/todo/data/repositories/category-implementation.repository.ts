import { Injectable } from '@angular/core';
import { Observable, from, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Category } from '../../domain/entities/category.entity';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { LocalStorageDatasource } from '../datasources/local-storage.datasource';
import { CategoryService } from '@shared/services/category/category.service';

const CATEGORY_COLLECTION = 'categories';

@Injectable({
  providedIn: 'root', // This makes it a singleton and available throughout the app
})
export class CategoryImplementationRepository extends CategoryRepository {
  constructor(
    private localStorageDatasource: LocalStorageDatasource,
    private categoryService: CategoryService
  ) {
    super();
  }

  getAllCategories(): Observable<Category[]> {
    // Obtener de localStorage (para offline) y de Firebase (para sincronización)
    return this.categoryService.getAllCategories();
  }

  getCategoryById(id: string): Observable<Category | undefined> {
    return this.localStorageDatasource.getById<Category>(CATEGORY_COLLECTION, id);
  }

  createCategory(category: Omit<Category, 'id'>): Observable<Category> {
    // Generate a default color if not provided for simplicity
    const newCategory: Category = {
      ...category,
      color: category.color || this.generateRandomColor()
    } as Category;

    // Guardar en localStorage primero (para offline)
    return this.localStorageDatasource.create<Category>(CATEGORY_COLLECTION, newCategory).pipe(
      switchMap((localCategory) => {
        // Luego guardar en Firebase
        return from(this.categoryService.addCategory(localCategory.name, localCategory.color)).pipe(
          map(() => localCategory)
        );
      })
    );
  }

  updateCategory(category: Category): Observable<Category> {
    // Actualizar en localStorage
    return this.localStorageDatasource.update<Category>(CATEGORY_COLLECTION, category).pipe(
      switchMap((localCategory) => {
        // Luego actualizar en Firebase
        return from(this.categoryService.updateCategory(category)).pipe(
          map(() => localCategory)
        );
      })
    );
  }

  deleteCategory(id: string): Observable<void> {
    // Eliminar de localStorage
    return this.localStorageDatasource.delete(CATEGORY_COLLECTION, id).pipe(
      switchMap(() => {
        // Luego eliminar de Firebase
        return from(this.categoryService.deleteCategory(id));
      })
    );
  }

  private generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}