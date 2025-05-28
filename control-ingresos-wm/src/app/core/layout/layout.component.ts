import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgIf],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  user: any; // Variable para almacenar el usuario

  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser(); // Asigna el usuario después de que el servicio esté inicializado
  }

  logout() {
    this.authService.logout();
  }
}
