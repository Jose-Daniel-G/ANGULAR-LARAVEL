import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule, NgForm } from '@angular/forms'; // Importa NgForm
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NavbarComponent, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  public userData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  public errorMessage: string = ''; // Variable para manejar errores
  public successMessage: string = ''; // Mensaje de éxito

  constructor(
    private AuthenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(registerForm: NgForm) {
    this.errorMessage = ''; // Resetea el mensaje de error antes de cada intento
    this.successMessage = ''; // Resetea el mensaje de éxito

    if (registerForm.valid) {
      if (this.userData.password !== this.userData.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden.';
        return; // No continuar si las contraseñas no coinciden
      }
// 
      this.AuthenticationService.register(
        this.userData.fullName,
        this.userData.email,
        this.userData.password,
        this.userData.confirmPassword
      ).subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          this.successMessage = 'Registro exitoso. Redirigiendo a login...';
          setTimeout(() => {
            this.router.navigate(['/login']); // Redirige a la página de login
          }, 2000); // Redirige después de 2 segundos para mostrar el mensaje de éxito
        },
        error: (error) => {
          console.error('Error en el registro', error);
          this.errorMessage =
            'Hubo un problema al registrar el usuario. Inténtelo más tarde.';
        },
      });
    } else {
      this.errorMessage =
        'El formulario tiene errores. Por favor, revisa los campos.';
    }
  }
}
