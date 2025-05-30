import { Component } from '@angular/core';
// import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // user:any = null;
  // constructor(public authService: AuthenticationService) { }

  // ngOnInit(): void {
  //   this.user = this.authService.getUser();  // ← OBTENER EL USUARIO AL INICIAR
  // }

  // logout(){
  //   const allDevice = confirm('¿Cerrar sesión en todos los dispositivos?');
  //   this.authService.logout(allDevice);
  // }
}
