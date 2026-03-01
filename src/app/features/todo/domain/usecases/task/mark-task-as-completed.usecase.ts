import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/core/base/use-case';
import { Task } from '../../entities/task.entity';
import { TaskRepository } from '../../repositories/task.repository';

@Injectable()
export class MarkTaskAsCompletedUseCase implements UseCase<{ id: string; completed: boolean }, Task> {
  constructor(private taskRepository: TaskRepository) {}

  execute(params: { id: string; completed: boolean }): Observable<Task> {
    return this.taskRepository.markTaskAsCompleted(params.id, params.completed);
  }
}
