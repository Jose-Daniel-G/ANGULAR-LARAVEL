import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../../../core/services/formulario.service'; // ¡Ruta de importación ajustada!
import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-formulario-display', // Este selector es el que usarás en tu HTML
//   templateUrl: './formulario-display.component.html',
//   styleUrls: ['./formulario-display.component.css']
// })
@Component({                  //nueva version del componente angular 18
  selector: 'app-formulario', // Tu selector del componente
  standalone: true,           // ¡Marca el componente como autónomo!
  imports: [CommonModule], // Importa CommonModule aquí
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

export class FormularioComponent implements OnInit {
  formularioData: any;
  loading: boolean = true;
  error: string | null = null;

  constructor(private formularioService: FormularioService) { }

  ngOnInit(): void {
    this.getFormulario();
  }

  getFormulario(): void {
    this.loading = true;
    this.error = null;
    const idFormulario = 103;

    this.formularioService.getFormularioComplete(idFormulario).subscribe({
      next: (response) => {
        if (response.result === 'OK' && response.data) {
          this.formularioData = response.data;
        } else {
          this.error = 'La API no devolvió un resultado OK o no tiene datos.';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al obtener los datos del formulario: ' + err.message;
        this.loading = false;
        console.error(err);
      }
    });
  }
}
