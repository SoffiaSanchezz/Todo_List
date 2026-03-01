import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/core/base/use-case';
import { CategoryRepository } from '../../repositories/category.repository';

@Injectable()
export class DeleteCategoryUseCase implements UseCase<string, void> {
  constructor(private categoryRepository: CategoryRepository) {}

  execute(params: string): Observable<void> {
    return this.categoryRepository.deleteCategory(params);
  }
}
