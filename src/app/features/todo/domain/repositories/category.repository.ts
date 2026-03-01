import { Observable } from 'rxjs';
import { Category } from '../entities/category.entity';

export abstract class CategoryRepository {
  abstract getAllCategories(): Observable<Category[]>;
  abstract getCategoryById(id: string): Observable<Category | undefined>;
  abstract createCategory(category: Omit<Category, 'id'>): Observable<Category>;
  abstract updateCategory(category: Category): Observable<Category>;
  abstract deleteCategory(id: string): Observable<void>;
}
