import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/core/base/use-case';
import { Category } from '../../entities/category.entity';
import { CategoryRepository } from '../../repositories/category.repository';

@Injectable()
export class CreateCategoryUseCase implements UseCase<Omit<Category, 'id'>, Category> {
  constructor(private categoryRepository: CategoryRepository) {}

  execute(params: Omit<Category, 'id'>): Observable<Category> {
    return this.categoryRepository.createCategory(params);
  }
}
