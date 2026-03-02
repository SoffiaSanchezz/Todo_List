import { Timestamp } from '@angular/fire/firestore';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonicModule,
  ModalController,
  PopoverController,
  AlertController,
  ToastController,
  MenuController // Add MenuController
} from '@ionic/angular';
import { Router } from '@angular/router';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { TaskModalComponent } from '../../components/task-modal/task-modal.component';
import { CategoryModalComponent } from '../../components/category-modal/category-modal.component';
import { CategoryListModalComponent } from '../../components/category-list-modal/category-list-modal.component';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { SessionProviderservice } from '@shared/services/auth/session-provider.service';
import { TaskService } from '@shared/services/task/task.service';
import { CategoryService } from '@shared/services/category/category.service';
import { Task, TaskStatus } from '../../../domain/entities/task.entity';
import { Category } from '../../../domain/entities/category.entity'; // This line should be already correct
import { CommonModule } from '@angular/common';
import { LoaderService } from '@shared/services/loader/loader.service';

// Definir los TaskStatus si no están en tu interfaz de Task
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
  private tasksSubscription: Subscription | undefined;
  private categoriesSubscription: Subscription | undefined;

  // Servicios Firebase inyectados
  private authService = inject(SessionProviderservice);
  private taskService = inject(TaskService);
  private categoryService = inject(CategoryService);
  private loaderService = inject(LoaderService);
  private router = inject(Router);
  private alertCtrl = inject(AlertController);
  private toastCtrl = inject(ToastController);
  private menuCtrl = inject(MenuController); // Inject MenuController

  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit() {
    this.checkAuthentication();
    this.loadCategories();
    this.loadTasks();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

  private async checkAuthentication() {
    const user = await this.authService.getCurrentUser();
    if (!user) {
      this.router.navigateByUrl('/auth/login', { replaceUrl: true });
    }
  }

  async loadCategories() {
    const loading = await this.presentLoading('Cargando categorías...');

    this.categoriesSubscription = this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.cdr.detectChanges();
        loading.dismiss();
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
        loading.dismiss();
        this.presentToast('Error al cargar categorías.', 'danger');
      }
    });
  }

  async loadTasks() {
    const loading = await this.presentLoading('Cargando tareas...');

    this.tasksSubscription = this.taskService.getTasks().subscribe({
      next: (tasks) => {
        // Mapear las tareas del servicio a Task del dominio
        this.tasks = tasks.map(task => ({
          id: task.id,
          userId: task.userId,
          title: task.title,
          description: task.description || '',
          status: task.status,
          categoryId: task.categoryId,
          completed: task.completed,
          createdAt: task.createdAt instanceof Timestamp ? task.createdAt.toDate() : task.createdAt,
          updatedAt: task.updatedAt instanceof Timestamp ? task.updatedAt.toDate() : task.updatedAt,
        }));

        this.groupTasksByStatus();
        this.cdr.detectChanges();
        loading.dismiss();
      },
      error: (err) => {
        console.error('Error al cargar tareas:', err);
        loading.dismiss();
        this.presentToast('Error al cargar tareas.', 'danger');
      }
    });
  }

  groupTasksByStatus() {
    this.columns = this.taskStatuses.map(status => ({
      status,
      title: this.getTaskStatusTitle(status),
      tasks: this.tasks
        .filter(task => task.status === status)
        .sort((a, b) => {
          const dateA = a.updatedAt instanceof Timestamp ? a.updatedAt.toDate().getTime() : a.updatedAt.getTime();
          const dateB = b.updatedAt instanceof Timestamp ? b.updatedAt.toDate().getTime() : b.updatedAt.getTime();
          return dateB - dateA; // Orden descendente (más recientes primero)
        }),
    }));
  }

  getTaskStatusTitle(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.NEW: return 'New';
      case TaskStatus.SCHEDULED: return 'Scheduled';
      case TaskStatus.IN_PROGRESS: return 'In Progress';
      case TaskStatus.COMPLETED: return 'Completed';
      default: return '';
    }
  }

  getCategoryName(categoryId: string | undefined): string {
    return this.categories.find(c => c.id === categoryId)?.name || 'No Category';
  }

  getCategoryColor(categoryId: string | undefined): string {
    return this.categories.find(c => c.id === categoryId)?.color || '#cccccc';
  }

  async openCreateTaskModal(status: TaskStatus) {
    const modal = await this.modalController.create({
      component: TaskModalComponent,
      componentProps: {
        taskStatus: status,
        categories: this.categories,
      },
    });
    modal.onDidDismiss().then(async (result) => {
      if (result.data) {
        await this.addTask({ ...result.data, status: status });
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
    modal.onDidDismiss().then(async (result) => {
      if (result.data) {
        await this.updateTask(result.data);
      }
    });
    await modal.present();
  }

  async openCreateCategoryModal() {
    const modal = await this.modalController.create({
      component: CategoryModalComponent,
    });
    modal.onDidDismiss().then(() => {
      // La categoría ya se guardó en el modal, solo recargamos la lista
      this.loadCategories();
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
    modal.onDidDismiss().then(() => {
      // La categoría ya se actualizó en el modal, solo recargamos la lista
      this.loadCategories();
    });
    await modal.present();
  }

  async openCategoryMenu() {
    const modal = await this.modalController.create({
      component: CategoryListModalComponent,
    });
    
    await modal.present();
    
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.loadCategories();
      this.loadTasks(); // Por si se eliminó una categoría vinculada a tareas
    }
  }

  async presentDeleteConfirm(categoryId: string) {
    const alert = await this.alertCtrl.create({
        header: 'Confirmar Eliminación',
        message: '¿Estás seguro de que quieres eliminar esta categoría?',
        buttons: [
            {
                text: 'Cancelar',
                role: 'cancel'
            },
            {
                text: 'Eliminar',
                handler: async () => {
                    const loading = await this.presentLoading('Eliminando categoría...');
                    try {
                        await this.categoryService.deleteCategory(categoryId);
                        loading.dismiss();
                        this.presentToast('Categoría eliminada correctamente.', 'success');
                        this.loadCategories(); // Reload categories after deletion
                    } catch (error) {
                        console.error('Error al eliminar categoría:', error);
                        loading.dismiss();
                        this.presentToast('Error al eliminar categoría.', 'danger');
                    }
                }
            }
        ]
    });
    await alert.present();
  }

  // --- Operaciones con Firebase ---
  async addTask(taskData: Partial<Task>) {
    const loading = await this.presentLoading('Añadiendo tarea...');

    try {
      // Usar el servicio de tareas extendido o ajustar según tu implementación
      await this.taskService.addTask(
        taskData.title || '',
        taskData.description,
        taskData.categoryId,
        taskData.status || TaskStatus.NEW
      );

      // Si necesitas guardar más propiedades, podrías necesitar extender tu servicio
      // Para propiedades adicionales, podrías hacer un update después

      loading.dismiss();
      this.presentToast('Tarea añadida correctamente.', 'success');
    } catch (error) {
      console.error('Error al añadir tarea:', error);
      loading.dismiss();
      this.presentToast('Error al añadir tarea.', 'danger');
    }
  }

  async updateTask(updatedTask: Task) {
    const loading = await this.presentLoading('Actualizando tarea...');

    try {
      if (!updatedTask.id) {
        throw new Error('La tarea no tiene ID.');
      }
      // Solo actualizar propiedades básicas que soporta el servicio actual
      const taskToUpdate = {
        id: updatedTask.id,
        title: updatedTask.title,
        completed: updatedTask.completed,
        status: updatedTask.status,
        categoryId: updatedTask.categoryId || '',
        description: updatedTask.description || '',
        createdAt: updatedTask.createdAt,
        updatedAt: updatedTask.updatedAt
      };

      await this.taskService.updateTask(taskToUpdate);
      loading.dismiss();
      this.presentToast('Tarea actualizada correctamente.', 'success');
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      loading.dismiss();
      this.presentToast('Error al actualizar tarea.', 'danger');
    }
  }

  // --- Task actions ---
  async onTaskDeleted(taskId: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que quieres eliminar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: async () => {
            const loading = await this.presentLoading('Eliminando tarea...');
            try {
              await this.taskService.deleteTask(taskId);
              loading.dismiss();
              this.presentToast('Tarea eliminada correctamente.', 'success');
            } catch (error) {
              console.error('Error al eliminar tarea:', error);
              loading.dismiss();
              this.presentToast('Error al eliminar tarea.', 'danger');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async onTaskStatusChanged(event: { taskId: string; newStatus: TaskStatus }) {
    const loading = await this.presentLoading('Cambiando estado...');

    try {
      // Buscar la tarea actual
      const task = this.tasks.find(t => t.id === event.taskId);
      if (task) {
        const updatedTask = {
          ...task,
          status: event.newStatus,
          completed: event.newStatus === TaskStatus.COMPLETED
        };
        await this.updateTask(updatedTask);
        loading.dismiss();
        this.presentToast('Estado actualizado correctamente.', 'success');
      }
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      loading.dismiss();
      this.presentToast('Error al cambiar estado.', 'danger');
    }
  }

  async onTaskMarkedCompleted(event: { taskId: string; completed: boolean }) {
    const loading = await this.presentLoading('Actualizando tarea...');

    try {
      const task = this.tasks.find(t => t.id === event.taskId);
      if (task) {
        const updatedTask = {
          ...task,
          completed: event.completed,
          status: event.completed ? TaskStatus.COMPLETED : TaskStatus.IN_PROGRESS
        };
        await this.updateTask(updatedTask);
        loading.dismiss();
        this.presentToast('Tarea actualizada correctamente.', 'success');
      }
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      loading.dismiss();
      this.presentToast('Error al actualizar tarea.', 'danger');
    }
  }

  // --- Filtering ---
  filterTasks(event: any) {
    const categoryId = event.detail.value;
    this.filteredCategoryId = categoryId === 'all' ? null : categoryId;

    if (this.filteredCategoryId === null) {
      this.loadTasks();
    } else {
      // Filtrar localmente las tareas ya cargadas
      this.filterTasksLocally(this.filteredCategoryId);
    }
  }

  private filterTasksLocally(categoryId: string) {
    const filteredTasks = this.tasks.filter(task => task.categoryId === categoryId);
    this.tasks = filteredTasks;
    this.groupTasksByStatus();
    this.cdr.detectChanges();
  }

  clearFilter() {
    this.filteredCategoryId = null;
    this.loadTasks();
  }

  async logout() {
    const loading = await this.presentLoading('Cerrando sesión...');
    try {
      await this.authService.logout();
      loading.dismiss();
      this.router.navigateByUrl('/auth/login', { replaceUrl: true });
      this.presentToast('Sesión cerrada correctamente.', 'success');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      loading.dismiss();
      this.presentToast('Error al cerrar sesión.', 'danger');
    }
  }

  // --- Helpers ---
  private async presentLoading(message: string) {
    this.loaderService.show(message);
    return {
      dismiss: () => this.loaderService.hide()
    };
  }

  private async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }

  // Método para obtener conteo de tareas por categoría
  getTaskCountByCategory(categoryId: string): number {
    return this.tasks.filter(task => task.categoryId === categoryId).length;
  }
}
