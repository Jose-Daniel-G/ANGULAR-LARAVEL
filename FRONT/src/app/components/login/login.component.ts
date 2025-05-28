import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private auth: AuthenticationService) { }

  ngOnInit(): void {}

  onSubmit(form: any) { 
    if (form.valid) {
      // Asignar los valores del formulario a las constantes
      this.email = form.value.email;
      this.password = form.value.password;

      // Llamada al servicio de autenticación
      this.auth.login(this.email, this.password).subscribe({
        next: (response) => {
          // Si la respuesta es exitosa, guardar la información del usuario
          // console.log('Login exitoso', response);
          console.log('Usuario:', this.auth.getUser());

          // Redirigir al dashboard
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          // Si hay un error, mostrar un mensaje adecuado
          console.error('Error en el login', err);

          // Mostrar alerta de error
          alert('Error: Usuario y contraseña incorrectas.');

          // Opcional: puedes también guardar el mensaje de error en una variable
          this.errorMessage = 'Credenciales incorrectas, por favor intenta de nuevo.';
        }
      });
    }
  }
}
