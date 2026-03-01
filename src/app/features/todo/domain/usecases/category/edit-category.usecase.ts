import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/core/base/use-case';
import { Category } from '../../entities/category.entity';
import { CategoryRepository } from '../../repositories/category.repository';

@Injectable()
export class EditCategoryUseCase implements UseCase<Category, Category> {
  constructor(private categoryRepository: CategoryRepository) {}

  execute(params: Category): Observable<Category> {
    return this.categoryRepository.updateCategory(params);
  }
}
