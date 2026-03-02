import { TestBed } from '@angular/core/testing';
import { TodoInteractor } from './todo.interactor';
import { CreateTaskUseCase } from '../domain/usecases/task/create-task.usecase';
import { EditTaskUseCase } from '../domain/usecases/task/edit-task.usecase';
import { DeleteTaskUseCase } from '../domain/usecases/task/delete-task.usecase';
import { MarkTaskAsCompletedUseCase } from '../domain/usecases/task/mark-task-as-completed.usecase';
import { ChangeTaskStatusUseCase } from '../domain/usecases/task/change-task-status.usecase';
import { GetAllTasksUseCase } from '../domain/usecases/task/get-all-tasks.usecase';
import { FilterTasksByCategoryUseCase } from '../domain/usecases/task/filter-tasks-by-category.usecase';
import { CreateCategoryUseCase } from '../domain/usecases/category/create-category.usecase';
import { EditCategoryUseCase } from '../domain/usecases/category/edit-category.usecase';
import { DeleteCategoryUseCase } from '../domain/usecases/category/delete-category.usecase';
import { GetAllCategoriesUseCase } from '../domain/usecases/category/get-all-categories.usecase';
import { of } from 'rxjs';

describe('TodoInteractor', () => {
  let interactor: TodoInteractor;

  beforeEach(() => {
    const mockUseCase = { execute: () => of(null) };

    TestBed.configureTestingModule({
      providers: [
        TodoInteractor,
        { provide: CreateTaskUseCase, useValue: mockUseCase },
        { provide: EditTaskUseCase, useValue: mockUseCase },
        { provide: DeleteTaskUseCase, useValue: mockUseCase },
        { provide: MarkTaskAsCompletedUseCase, useValue: mockUseCase },
        { provide: ChangeTaskStatusUseCase, useValue: mockUseCase },
        { provide: GetAllTasksUseCase, useValue: mockUseCase },
        { provide: FilterTasksByCategoryUseCase, useValue: mockUseCase },
        { provide: CreateCategoryUseCase, useValue: mockUseCase },
        { provide: EditCategoryUseCase, useValue: mockUseCase },
        { provide: DeleteCategoryUseCase, useValue: mockUseCase },
        { provide: GetAllCategoriesUseCase, useValue: mockUseCase },
      ]
    });

    interactor = TestBed.inject(TodoInteractor);
  });

  it('should be created', () => {
    expect(interactor).toBeTruthy();
  });
});
