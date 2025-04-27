import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';  // Variable para mostrar errores
  constructor(private router: Router, private auth: AuthenticationService) { }
  ngOnInit(): void {
  }
  onSubmit(form: any) { 
    if (form.valid) {
      // Asignar los valores del formulario a las constantes
      this.email = form.value.email;
      this.password = form.value.password;

      // Imprimir las constantes con los valores del formulario
      // console.log(this.email, this.password);

      // console.log(form.value);
      // Llamada al servicio de autenticación
      this.auth.login(this.email, this.password).subscribe({
        next: (response) => {
          // Si la respuesta es exitosa, guardar la información del usuario
          console.log('Login exitoso', response);

          // Aquí puedes guardar los datos del usuario en el localStorage
          localStorage.setItem('user', JSON.stringify(response));

          // Redirigir al dashboard
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          // Si hay un error, mostrar un mensaje adecuado
          console.error('Error en el login', err);
          this.errorMessage = 'Credenciales incorrectas, por favor intenta de nuevo.';
        }
      });
    }
  }
}
