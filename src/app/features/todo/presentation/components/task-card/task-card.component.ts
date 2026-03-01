import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, PopoverController } from '@ionic/angular';
import { Task, TaskStatus } from '../../../domain/entities/task.entity';
import { Category } from '../../../domain/entities/category.entity';
import { CategoryChipComponent } from '../category-chip/category-chip.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, CategoryChipComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Task;
  @Input() categories: Category[] = [];

  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<string>();
  @Output() changeStatus = new EventEmitter<{ taskId: string; newStatus: TaskStatus }>();
  @Output() markCompleted = new EventEmitter<{ taskId: string; completed: boolean }>();
  // NUEVO EVENTO PARA EDITAR CATEGORÍA
  @Output() editCategory = new EventEmitter<Category>();

  currentTaskStatus: string = TaskStatus.NEW;
  taskStatuses = Object.values(TaskStatus);

  constructor(private popoverController: PopoverController) {
    this.currentTaskStatus = TaskStatus.NEW; // Default init
  }

  ngOnInit() {
    this.currentTaskStatus = this.task.status;
  }

  getCategoryForTask(): Category | undefined {
    return this.categories.find(cat => cat.id === this.task.categoryId);
  }

  onEditClick() {
    this.editTask.emit(this.task);
  }

  onDeleteClick() {
    this.deleteTask.emit(this.task.id);
  }

  // NUEVO MÉTODO PARA MANEJAR LA EDICIÓN DE CATEGORÍA
  onEditCategoryClick() {
    const category = this.getCategoryForTask();
    if (category) {
      this.editCategory.emit(category);
    }
  }

  onStatusChange(event: any) {
    const newStatus = event.detail.value as TaskStatus;
    if (newStatus !== this.task.status) {
      this.changeStatus.emit({ taskId: this.task.id, newStatus });
    }
  }

  onToggleCompleted() {
    this.markCompleted.emit({ taskId: this.task.id, completed: !this.task.completed });
  }

  // Helper to prevent propagation of click event from select (to avoid triggering edit twice)
  stopEventPropagation(event: Event) {
    event.stopPropagation();
  }
}