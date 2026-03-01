import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from 'src/app/core/base/use-case';
import { Task } from '../../entities/task.entity';
import { TaskRepository } from '../../repositories/task.repository';

@Injectable()
export class FilterTasksByCategoryUseCase implements UseCase<string | null, Task[]> {
  constructor(private taskRepository: TaskRepository) {}

  execute(params: string | null): Observable<Task[]> {
    return this.taskRepository.filterTasksByCategory(params);
  }
}
