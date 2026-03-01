import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../domain/entities/category.entity';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { LocalStorageDatasource } from '../datasources/local-storage.datasource';

const CATEGORY_COLLECTION = 'categories';

@Injectable({
  providedIn: 'root', // This makes it a singleton and available throughout the app
})
export class CategoryImplementationRepository extends CategoryRepository {
  constructor(private localStorageDatasource: LocalStorageDatasource) {
    super();
  }

  getAllCategories(): Observable<Category[]> {
    return this.localStorageDatasource.getAll<Category>(CATEGORY_COLLECTION);
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
    return this.localStorageDatasource.create<Category>(CATEGORY_COLLECTION, newCategory);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.localStorageDatasource.update<Category>(CATEGORY_COLLECTION, category);
  }

  deleteCategory(id: string): Observable<void> {
    return this.localStorageDatasource.delete(CATEGORY_COLLECTION, id);
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
