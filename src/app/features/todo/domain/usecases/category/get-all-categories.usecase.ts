import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/core/base/use-case';
import { Category } from '../../entities/category.entity';
import { CategoryRepository } from '../../repositories/category.repository';

@Injectable()
export class GetAllCategoriesUseCase implements UseCase<void, Category[]> {
  constructor(private categoryRepository: CategoryRepository) {}

  execute(params: void): Observable<Category[]> {
    return this.categoryRepository.getAllCategories();
  }
}
