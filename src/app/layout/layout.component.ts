import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonApp, IonRouterOutlet } from "@ionic/angular/standalone";


@Component({
  selector: 'app-root',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonApp, // Added because it was there
    IonRouterOutlet // Added because it was there
  ]
})
export class LayoutComponent {

  constructor() { }

}
