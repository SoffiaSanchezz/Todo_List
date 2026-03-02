import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, AlertController, ToastController } from '@ionic/angular';
import { Category } from '../../../domain/entities/category.entity';
import { TodoInteractor } from '../../../application/todo.interactor';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-category-list-modal',
  templateUrl: './category-list-modal.component.html',
  styleUrls: ['./category-list-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class CategoryListModalComponent implements OnInit {
  categories: Category[] = [];
  
  private modalCtrl = inject(ModalController);
  private todoInteractor = inject(TodoInteractor);
  private alertCtrl = inject(AlertController);
  private toastCtrl = inject(ToastController);

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.todoInteractor.getAllCategories().pipe(take(1)).subscribe({
      next: (categories) => (this.categories = categories),
      error: (err) => console.error('Error loading categories', err),
    });
  }

  async onEditCategory(category: Category) {
    const modal = await this.modalCtrl.create({
      component: CategoryModalComponent,
      componentProps: { category },
      cssClass: 'custom-modal'
    });
    
    await modal.present();
    const { data } = await modal.onDidDismiss();
    
    if (data) {
      this.loadCategories();
    }
  }

  async onDeleteCategory(category: Category) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Categoría',
      subHeader: `¿Seguro que quieres eliminar "${category.name}"?`,
      message: 'Esta acción no se puede deshacer.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.todoInteractor.deleteCategory(category.id).pipe(take(1)).subscribe({
              next: () => {
                this.presentToast('Categoría eliminada');
                this.loadCategories();
              },
              error: (err) => this.presentToast('Error al eliminar', 'danger'),
            });
          },
        },
      ],
    });
    await alert.present();
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }

  onDismiss() {
    this.modalCtrl.dismiss(true);
  }

  getContrastColor(hexColor: string): string {
    if (!hexColor) return '#FFFFFF';
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#1a1a1a' : '#FFFFFF';
  }
}
