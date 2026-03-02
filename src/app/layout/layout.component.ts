import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { LoaderService } from '../shared/services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule, LoaderComponent]
})
export class LayoutComponent {
  public loaderService = inject(LoaderService);

  constructor() { }
}