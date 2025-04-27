import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  user: any = {};  // ← DECLARAR AQUÍ

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();  // ← OBTENER EL USUARIO AL INICIAR
    // console.log('Usuario cargado en Sidebar:', this.user);  // (Opcional, para confirmar que trae datos)
  }
}
