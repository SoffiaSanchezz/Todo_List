import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class PageNotFoundComponent { // Removed implements OnInit

  constructor(private router: Router) { }

  // Method to navigate to login page
  goToLogin() {
    this.router.navigateByUrl('/auth/login');
  }
}
