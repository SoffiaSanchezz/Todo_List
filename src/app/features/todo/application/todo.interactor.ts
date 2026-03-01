import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../domain/entities/category.entity';
import { Task, TaskStatus } from '../domain/entities/task.entity';
import { CreateCategoryUseCase } from '../domain/usecases/category/create-category.usecase';
import { DeleteCategoryUseCase } from '../domain/usecases/category/delete-category.usecase';
import { EditCategoryUseCase } from '../domain/usecases/category/edit-category.usecase';
import { GetAllCategoriesUseCase } from '../domain/usecases/category/get-all-categories.usecase';
import { ChangeTaskStatusUseCase } from '../domain/usecases/task/change-task-status.usecase';
import { CreateTaskUseCase } from '../domain/usecases/task/create-task.usecase';
import { DeleteTaskUseCase } from '../domain/usecases/task/delete-task.usecase';
import { EditTaskUseCase } from '../domain/usecases/task/edit-task.usecase';
import { FilterTasksByCategoryUseCase } from '../domain/usecases/task/filter-tasks-by-category.usecase';
import { GetAllTasksUseCase } from '../domain/usecases/task/get-all-tasks.usecase';
import { MarkTaskAsCompletedUseCase } from '../domain/usecases/task/mark-task-as-completed.usecase';

@Injectable({
  providedIn: 'root',
})
export class TodoInteractor {
  constructor(
    // Category Use Cases
    private createCategoryUseCase: CreateCategoryUseCase,
    private editCategoryUseCase: EditCategoryUseCase,
    private deleteCategoryUseCase: DeleteCategoryUseCase,
    private getAllCategoriesUseCase: GetAllCategoriesUseCase,

    // Task Use Cases
    private createTaskUseCase: CreateTaskUseCase,
    private editTaskUseCase: EditTaskUseCase,
    private deleteTaskUseCase: DeleteTaskUseCase,
    private markTaskAsCompletedUseCase: MarkTaskAsCompletedUseCase,
    private changeTaskStatusUseCase: ChangeTaskStatusUseCase,
    private getAllTasksUseCase: GetAllTasksUseCase,
    private filterTasksByCategoryUseCase: FilterTasksByCategoryUseCase
  ) {}

  // --- Category Operations ---
  createCategory(category: Omit<Category, 'id'>): Observable<Category> {
    return this.createCategoryUseCase.execute(category);
  }

  editCategory(category: Category): Observable<Category> {
    return this.editCategoryUseCase.execute(category);
  }

  deleteCategory(id: string): Observable<void> {
    return this.deleteCategoryUseCase.execute(id);
  }

  getAllCategories(): Observable<Category[]> {
    return this.getAllCategoriesUseCase.execute();
  }

  // --- Task Operations ---
  createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completed' | 'userId'>): Observable<Task> {
    return this.createTaskUseCase.execute(task);
  }

  editTask(task: Task): Observable<Task> {
    return this.editTaskUseCase.execute(task);
  }

  deleteTask(id: string): Observable<void> {
    return this.deleteTaskUseCase.execute(id);
  }

  markTaskAsCompleted(id: string, completed: boolean): Observable<Task> {
    return this.markTaskAsCompletedUseCase.execute({ id, completed });
  }

  changeTaskStatus(id: string, status: TaskStatus): Observable<Task> {
    return this.changeTaskStatusUseCase.execute({ id, status });
  }

  getAllTasks(): Observable<Task[]> {
    return this.getAllTasksUseCase.execute();
  }

  filterTasksByCategory(categoryId: string | null): Observable<Task[]> {
    return this.filterTasksByCategoryUseCase.execute(categoryId);
  }
}
