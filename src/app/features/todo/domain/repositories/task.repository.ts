import { Observable } from 'rxjs';
import { Task, TaskStatus } from '../entities/task.entity';

export abstract class TaskRepository {
  abstract getAllTasks(): Observable<Task[]>;
  abstract getTaskById(id: string): Observable<Task | undefined>;
  abstract createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completed'>): Observable<Task>;
  abstract updateTask(task: Task): Observable<Task>;
  abstract deleteTask(id: string): Observable<void>;
  abstract changeTaskStatus(id: string, status: TaskStatus): Observable<Task>;
  abstract markTaskAsCompleted(id: string, completed: boolean): Observable<Task>;
  abstract filterTasksByCategory(categoryId: string | null): Observable<Task[]>;
}
