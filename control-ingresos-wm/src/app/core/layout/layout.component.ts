import { Component, AfterViewInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AdminLteService } from '../services/admin-lte.service';

import { NgIf } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgIf],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  user: any; // Variable para almacenar el usuario

  constructor(
    private authService: AuthService,
    private adminLte: AdminLteService
  ) {
    this.user = this.authService.getCurrentUser(); // Asigna el usuario después de que el servicio esté inicializado
  }

  ngAfterViewInit(): void {
    const toggleBtn = document.querySelector('[data-lte-toggle="sidebar"]');

    toggleBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.adminLte.toggleSidebar(); // mejor usar el servicio
    });
  }

  logout() {
    this.authService.logout();
  }
}
