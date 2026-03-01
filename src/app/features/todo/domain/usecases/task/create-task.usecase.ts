import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/core/base/use-case';
import { Task } from '../../entities/task.entity';
import { TaskRepository } from '../../repositories/task.repository';

// Input params for creating a task (excluding auto-generated fields)
type CreateTaskParams = Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completed' | 'userId'>;

@Injectable()
export class CreateTaskUseCase implements UseCase<CreateTaskParams, Task> {
  constructor(private taskRepository: TaskRepository) {}

  execute(params: CreateTaskParams): Observable<Task> {
    return this.taskRepository.createTask(params);
  }
}
