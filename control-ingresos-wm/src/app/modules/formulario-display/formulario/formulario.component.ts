// src/app/modules/formulario-display/formulario/formulario.component.ts

import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../../../core/services/formulario.service';
import { CommonModule } from '@angular/common';

// Define the interface for a question
interface Pregunta {
  idPregunta: number;
  nombre: string;
  etiqueta: string;
  descripcion: string;
  tipo: string;
  requerido: 'SI' | 'NO';
  sololectura: 'SI' | 'NO';
  limiteCaracteres?: number; // Optional, as not all types have it
  funcion?: string; // For CALCULATED_WEBSERVICE
  // Add other properties as needed based on your actual data structure
}

// Define the interface for the API response data
interface FormularioData {
  idFormulario: number;
  nombre: string;
  descripcion: string;
  preguntas: Pregunta[];
}

// Define the interface for the full API response
interface ApiResponse {
  result: string;
  data: FormularioData;
  message?: string; // Optional message
}

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  // Use the new interfaces for better type safety
  formularioData: FormularioData | null = null; // Initialize as null
  mesesChequeo: Pregunta[] = []; // Array of Pregunta objects
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

    // Type the response of the service call
    this.formularioService.getFormularioComplete(idFormulario).subscribe({
      next: (response: ApiResponse) => { // Use ApiResponse here
        if (response.result === 'OK' && response.data) {
          this.formularioData = response.data; // Assign the typed data
          const preguntas: Pregunta[] = response.data.preguntas || []; // Ensure 'preguntas' is typed as Pregunta[]

          const nombresMeses = [
            'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
            'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
          ];

          // Now 'p' is explicitly typed as 'Pregunta'
          this.mesesChequeo = preguntas.filter((p: Pregunta) =>
            p.tipo === 'CHEQUEO' &&
            nombresMeses.includes(p.descripcion?.toUpperCase())
          );
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