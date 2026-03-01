import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoRoutingModule } from './todo-routing.module';
import { CreateCategoryUseCase } from './domain/usecases/category/create-category.usecase';
import { DeleteCategoryUseCase } from './domain/usecases/category/delete-category.usecase';
import { EditCategoryUseCase } from './domain/usecases/category/edit-category.usecase';
import { GetAllCategoriesUseCase } from './domain/usecases/category/get-all-categories.usecase';
import { ChangeTaskStatusUseCase } from './domain/usecases/task/change-task-status.usecase';
import { CreateTaskUseCase } from './domain/usecases/task/create-task.usecase';
import { DeleteTaskUseCase } from './domain/usecases/task/delete-task.usecase';
import { EditTaskUseCase } from './domain/usecases/task/edit-task.usecase';
import { FilterTasksByCategoryUseCase } from './domain/usecases/task/filter-tasks-by-category.usecase';
import { GetAllTasksUseCase } from './domain/usecases/task/get-all-tasks.usecase';
import { MarkTaskAsCompletedUseCase } from './domain/usecases/task/mark-task-as-completed.usecase';
import { TodoInteractor } from './application/todo.interactor';
import { CategoryRepository } from './domain/repositories/category.repository';
import { TaskRepository } from './domain/repositories/task.repository';
import { CategoryImplementationRepository } from './data/repositories/category-implementation.repository';
import { TaskImplementationRepository } from './data/repositories/task-implementation.repository';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TodoRoutingModule
  ],
  providers: [
    // Repositories
    { provide: CategoryRepository, useClass: CategoryImplementationRepository },
    { provide: TaskRepository, useClass: TaskImplementationRepository },

    // Category Use Cases
    CreateCategoryUseCase,
    DeleteCategoryUseCase,
    EditCategoryUseCase,
    GetAllCategoriesUseCase,

    // Task Use Cases
    ChangeTaskStatusUseCase,
    CreateTaskUseCase,
    DeleteTaskUseCase,
    EditTaskUseCase,
    FilterTasksByCategoryUseCase,
    GetAllTasksUseCase,
    MarkTaskAsCompletedUseCase,

    // Interactor
    TodoInteractor
  ]
})
export class TodoModule { }
