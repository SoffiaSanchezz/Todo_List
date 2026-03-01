import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Category } from '../../../domain/entities/category.entity';
import { TodoInteractor } from '../../../application/todo.interactor';
import { take } from 'rxjs';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class CategoryModalComponent implements OnInit {
  @Input() category?: Category;

  categoryForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private todoInteractor: TodoInteractor
  ) {
    this.categoryForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      color: ['#000000', Validators.required], // Default color
    });
  }

  ngOnInit() {
    if (this.category) {
      this.isEditMode = true;
      this.categoryForm.patchValue(this.category);
    }
  }

  onSave() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const categoryData: Category = this.categoryForm.value;

    if (this.isEditMode && this.category) {
      const updatedCategory: Category = { ...this.category, ...categoryData };
      this.todoInteractor.editCategory(updatedCategory).pipe(take(1)).subscribe({
        next: () => this.modalController.dismiss(updatedCategory),
        error: (err) => console.error('Error updating category', err),
      });
    } else {
      const newCategory: Omit<Category, 'id'> = {
        name: categoryData.name,
        color: categoryData.color,
      };
      this.todoInteractor.createCategory(newCategory).pipe(take(1)).subscribe({
        next: () => this.modalController.dismiss(newCategory),
        error: (err) => console.error('Error creating category', err),
      });
    }
  }

  onDelete() {
    if (this.category && this.category.id) {
      this.todoInteractor.deleteCategory(this.category.id).pipe(take(1)).subscribe({
        next: () => this.modalController.dismiss(true),
        error: (err) => console.error('Error deleting category', err),
      });
    }
  }

  onCancel() {
    this.modalController.dismiss(false);
  }
}
