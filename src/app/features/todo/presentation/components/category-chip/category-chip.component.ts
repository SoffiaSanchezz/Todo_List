import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Category } from '../../../domain/entities/category.entity';

@Component({
  selector: 'app-category-chip',
  templateUrl: './category-chip.component.html',
  styleUrls: ['./category-chip.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryChipComponent {
  @Input() category: Category | undefined;
  @Output() editCategory = new EventEmitter<Category>(); // Optional: if clicking chip edits category

  onEditCategory() {
    if (this.category) {
      this.editCategory.emit(this.category);
    }
  }
}
