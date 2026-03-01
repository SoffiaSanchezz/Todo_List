import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Task, TaskStatus } from '../../../domain/entities/task.entity';
import { Category } from '../../../domain/entities/category.entity';
import { TodoInteractor } from '../../../application/todo.interactor';
import { take } from 'rxjs';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class TaskModalComponent implements OnInit {
  @Input() task?: Task;
  @Input() taskStatus?: TaskStatus; // For creating a new task in a specific column
  @Input() categories: Category[] = [];

  taskForm: FormGroup;
  isEditMode: boolean = false;
  taskStatuses = Object.values(TaskStatus);

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private todoInteractor: TodoInteractor
  ) {
    this.taskForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: [''],
      status: [TaskStatus.NEW, Validators.required],
      categoryId: [null],
      completed: [false],
    });
  }

  ngOnInit() {
    if (this.task) {
      this.isEditMode = true;
      this.taskForm.patchValue(this.task);
    } else if (this.taskStatus) {
      this.taskForm.patchValue({ status: this.taskStatus });
    }
  }

  onSave() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const taskData: Task = this.taskForm.value;

    if (this.isEditMode && this.task) {
      // Ensure createdAt and updatedAt are preserved or updated as per logic
      const updatedTask: Task = {
        ...this.task, // Preserve original creation date, etc.
        ...taskData,
        updatedAt: new Date(),
      };
      this.todoInteractor.editTask(updatedTask).pipe(take(1)).subscribe({
        next: () => this.modalController.dismiss(true),
        error: (err) => console.error('Error updating task', err),
      });
    } else {
      const newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completed'> = {
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        categoryId: taskData.categoryId,
      };
      this.todoInteractor.createTask(newTask).pipe(take(1)).subscribe({
        next: () => this.modalController.dismiss(true),
        error: (err) => console.error('Error creating task', err),
      });
    }
  }

  onCancel() {
    this.modalController.dismiss(false);
  }
}
