import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/core/base/use-case';
import { Task, TaskStatus } from '../../entities/task.entity';
import { TaskRepository } from '../../repositories/task.repository';

@Injectable()
export class ChangeTaskStatusUseCase implements UseCase<{ id: string; status: TaskStatus }, Task> {
  constructor(private taskRepository: TaskRepository) {}

  execute(params: { id: string; status: TaskStatus }): Observable<Task> {
    return this.taskRepository.changeTaskStatus(params.id, params.status);
  }
}
