import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, PopoverController, AlertController, ToastController, MenuController } from '@ionic/angular';
import { TodoInteractor } from '../../../application/todo.interactor';
import { Category } from '../../../domain/entities/category.entity';
import { Task, TaskStatus } from '../../../domain/entities/task.entity';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { TaskModalComponent } from '../../components/task-modal/task-modal.component';
import { CategoryModalComponent } from '../../components/category-modal/category-modal.component';
import { map, Observable, Subject, take, takeUntil } from 'rxjs';

interface KanbanColumn {
  status: TaskStatus;
  title: string;
  tasks: Task[];
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskCardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListPage implements OnInit, OnDestroy {
  tasks: Task[] = [];
  categories: Category[] = [];
  filteredCategoryId: string | null = null;

  taskStatuses = Object.values(TaskStatus);
  columns: KanbanColumn[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private todoInteractor: TodoInteractor,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private alertController: AlertController,
    private toastController: ToastController,
    private menuController: MenuController, // Inject MenuController
    private cdr: ChangeDetectorRef // For ChangeDetectionStrategy.OnPush
  ) {}

  ngOnInit() {
    // ionViewWillEnter is generally better for loading data in Ionic pages
  }

  ionViewWillEnter() {
    this.loadCategories();
    this.loadTasks();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCategories() {
    this.todoInteractor.getAllCategories().pipe(
      takeUntil(this.destroy$)
    ).subscribe(categories => {
      this.categories = categories;
      this.cdr.detectChanges(); // Update view
    });
  }

  loadTasks() {
    this.todoInteractor.getAllTasks().pipe(
      takeUntil(this.destroy$)
    ).subscribe(tasks => {
      this.tasks = tasks;
      this.groupTasksByStatus();
      this.cdr.detectChanges(); // Update view
    });
  }

  groupTasksByStatus() {
    this.columns = this.taskStatuses.map(status => ({
      status,
      title: this.getTaskStatusTitle(status),
      tasks: this.tasks
        .filter(task => task.status === status)
        .sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime()), // Simple sorting
    }));
  }

  getTaskStatusTitle(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.NEW: return 'Nueva';
      case TaskStatus.SCHEDULED: return 'Programada';
      case TaskStatus.IN_PROGRESS: return 'En Progreso';
      case TaskStatus.COMPLETED: return 'Completada';
      default: return '';
    }
  }

  getCategoryName(categoryId: string | undefined): string {
    return this.categories.find(c => c.id === categoryId)?.name || 'Sin Categoría';
  }

  getCategoryColor(categoryId: string | undefined): string {
    return this.categories.find(c => c.id === categoryId)?.color || '#cccccc'; // Default grey
  }

  async openCreateTaskModal(status: TaskStatus) {
    const modal = await this.modalController.create({
      component: TaskModalComponent,
      componentProps: {
        taskStatus: status,
        categories: this.categories,
      },
    });
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadTasks(); // Reload tasks after create
      }
    });
    await modal.present();
  }

  async openEditTaskModal(task: Task) {
    const modal = await this.modalController.create({
      component: TaskModalComponent,
      componentProps: {
        task: task,
        categories: this.categories,
      },
    });
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadTasks(); // Reload tasks after edit
      }
    });
    await modal.present();
  }

  async openCreateCategoryModal() {
    const modal = await this.modalController.create({
      component: CategoryModalComponent,
      componentProps: {
        // No category for creation
      },
    });
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadCategories(); // Reload categories after create
      }
    });
    await modal.present();
  }

  async openEditCategoryModal(category: Category) {
    const modal = await this.modalController.create({
      component: CategoryModalComponent,
      componentProps: {
        category: category,
      },
    });
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadCategories(); // Reload categories after edit
        this.loadTasks(); // Also reload tasks in case category name/color changed
      }
    });
    await modal.present();
  }

  // --- Category Management ---

  async openEditCategoryAlert(category: Category) {
    const alert = await this.alertController.create({
      header: 'Editar Categoría',
      inputs: [
        {
          name: 'categoryName',
          type: 'text',
          placeholder: 'Nombre de la categoría',
          value: category.name,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.categoryName && data.categoryName.trim() !== '') {
              const updatedCategory: Category = {
                ...category,
                name: data.categoryName,
              };
              this.todoInteractor.editCategory(updatedCategory).pipe(take(1)).subscribe({
                next: () => {
                  this.presentToast('Categoría actualizada con éxito');
                  this.loadCategories(); // Refresh categories
                  this.loadTasks(); // Refresh tasks in case category name changed
                  this.menuController.close('categoryMenu'); // Close menu after editing
                },
                error: (err) => {
                  console.error('Error updating category', err);
                  this.presentToast('Error al actualizar la categoría', 'danger');
                },
              });
              return true; // Explicitly return true to close the alert after initiating async operation
            } else {
              this.presentToast('El nombre de la categoría no puede estar vacío', 'danger');
              return false; // Prevent alert from closing if validation fails
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async presentDeleteConfirm(categoryId: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que quieres eliminar esta categoría? Las tareas asociadas no se eliminarán, pero quedarán sin categoría.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteCategory(categoryId);
          },
        },
      ],
    });

    await alert.present();
  }

  private deleteCategory(categoryId: string) {
    this.todoInteractor.deleteCategory(categoryId).pipe(take(1)).subscribe({
      next: () => {
        // Update the local array to reflect the change immediately
        this.categories = this.categories.filter(cat => cat.id !== categoryId);
        this.presentToast('Categoría eliminada con éxito');
        this.loadTasks(); // Refresh tasks as some may have lost their category
        this.cdr.detectChanges(); // Manually trigger change detection
        this.menuController.close('categoryMenu'); // Close menu after deletion
      },
      error: (err) => {
        console.error('Error deleting category', err);
        this.presentToast('Error al eliminar la categoría', 'danger');
      }
    });
  }

  private async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

  // --- Menu control ---
  openCategoryMenu() {
    this.menuController.open('categoryMenu');
  }


  // --- Task actions ---
  onTaskDeleted(taskId: string) {
    this.todoInteractor.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }

  onTaskStatusChanged(event: { taskId: string; newStatus: TaskStatus }) {
    this.todoInteractor.changeTaskStatus(event.taskId, event.newStatus).subscribe(() => {
      this.loadTasks();
    });
  }

  onTaskMarkedCompleted(event: { taskId: string; completed: boolean }) {
    this.todoInteractor.markTaskAsCompleted(event.taskId, event.completed).subscribe(() => {
      this.loadTasks();
    });
  }

  // --- Filtering ---
  filterTasks(event: any) {
    const categoryId = event.detail.value;
    this.filteredCategoryId = categoryId === 'all' ? null : categoryId;

    if (this.filteredCategoryId === null) {
      this.loadTasks(); // Load all tasks
    } else {
      this.todoInteractor.filterTasksByCategory(this.filteredCategoryId).pipe(
        takeUntil(this.destroy$)
      ).subscribe(tasks => {
        this.tasks = tasks;
        this.groupTasksByStatus();
        this.cdr.detectChanges();
      });
    }
  }

  // --- Drag and Drop (conceptual) ---
  // Ionic doesn't have native drag-and-drop for Kanban directly without third-party libs
  // For simplicity, we'll assume status change through modals/select for now.
  // If drag-and-drop is a hard requirement, a library like @angular/cdk/drag-drop would be integrated here.

  // Example of a task being dropped into a new column (conceptual, requires D&D library)
  // onTaskDrop(event: CdkDragDrop<Task[]>, newStatus: TaskStatus) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,
  //     );
  //     const droppedTask = event.container.data[event.currentIndex];
  //     this.onTaskStatusChanged({ taskId: droppedTask.id, newStatus: newStatus });
  //   }
  // }
}
