import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/core/base/use-case';
import { TaskRepository } from '../../repositories/task.repository';

@Injectable()
export class DeleteTaskUseCase implements UseCase<string, void> {
  constructor(private taskRepository: TaskRepository) {}

  execute(params: string): Observable<void> {
    return this.taskRepository.deleteTask(params);
  }
}
