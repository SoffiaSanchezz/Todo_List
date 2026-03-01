import { Component, Input, Output, EventEmitter, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { IonicModule } from "@ionic/angular"
import type { Category } from "../../../domain/entities/category.entity"

@Component({
  selector: "app-category-chip",
  templateUrl: "./category-chip.component.html",
  styleUrls: ["./category-chip.component.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class CategoryChipComponent implements OnInit {
  @Input() category?: Category
  @Output() editCategory = new EventEmitter<void>()

  textColor = "#FFFFFF"

  ngOnInit() {
    if (this.category?.color) {
      this.textColor = this.getContrastColor(this.category.color)
    }
  }

  onEditCategory() {
    this.editCategory.emit()
  }

  private getContrastColor(hexColor: string): string {
    // Convertir hex a RGB
    const hex = hexColor.replace("#", "")
    const r = Number.parseInt(hex.substr(0, 2), 16)
    const g = Number.parseInt(hex.substr(2, 2), 16)
    const b = Number.parseInt(hex.substr(4, 2), 16)

    // Calcular luminancia relativa (WCAG)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

    // Si el fondo es claro, usar texto oscuro; si es oscuro, usar texto claro
    return luminance > 0.5 ? "#1a1a1a" : "#FFFFFF"
  }
}
