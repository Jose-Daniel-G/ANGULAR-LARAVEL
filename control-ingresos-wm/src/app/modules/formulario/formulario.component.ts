import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormularioService } from '../services/formulario.service';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
  FormsModule,
  FormControl,
} from '@angular/forms';

interface Subtask {
  name: string;
  completed: boolean;
}

interface Month {
  name: string;
  completed: boolean;
  subtasks: Subtask[];
}

function validNamePattern(control: AbstractControl): ValidationErrors | null {
  const valid = /^[a-zA-Z0-9\s]+$/.test(control.value);
  return valid ? null : { pattern: true };
}

function plateFormatValidator(control: AbstractControl): ValidationErrors | null {
  const valid = /^[A-Z]{3}-\d{3}$/.test(control.value);
  return valid ? null : { pattern: true };
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatCheckboxModule],
})
export class FormularioComponent implements OnInit {
  form!: FormGroup;

  readonly picoYPlacaDias: { [key: string]: number } = {
    '1': 5, '2': 5,
    '3': 1, '4': 1,
    '5': 2, '6': 2,
    '7': 3, '8': 3,
    '9': 4, '0': 4
  };

  months: Month[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ].map(name => ({ name, completed: false, subtasks: [] }));

  constructor(
    private fb: FormBuilder,
    private formularioService: FormularioService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(10), validNamePattern]],
      type_doc: ['', Validators.required],
      doc_number: ['', Validators.required],
      dv: [''],
      phone: [''],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      brand: [''],
      model: [''],
      plate: ['', [Validators.required, Validators.maxLength(7), plateFormatValidator]],
      type_vehicle: [''],
      observations: [''],
      total: ['', Validators.required],
      months: this.fb.array(this.months.map(month => this.createMonthGroup(month)))
    });

    this.form.get('plate')?.valueChanges.subscribe(value => {
      if (this.plateField?.valid) {
        const lastDigit = value.trim().slice(-1);
        const dia = this.picoYPlacaDias[lastDigit];

        if (dia !== undefined) {
          const fechas = this.getPicoYPlacaDates(dia);
          this.updateMonthSubtasks(fechas);
        }
      }
    });

    // this.obtenerDatos();
  }

  updateMonthSubtasks(fechas: string[][]): void {
    const today = new Date();
    this.months.forEach((month, i) => {
      month.subtasks = fechas[i].map(dateStr => {
        const date = new Date(dateStr);
        return {
          name: dateStr,
          completed: date < today
        };
      });
    });

    const monthFGs = this.months.map(month => this.createMonthGroup(month));
    const formArray = this.fb.array(monthFGs);
    this.form.setControl('months', formArray);
  }

  getPicoYPlacaDates(dia: number): string[][] {
    const year = new Date().getFullYear();
    const fechasPorMes: string[][] = [];

    for (let mes = 0; mes < 12; mes++) {
      const fechas: string[] = [];
      const date = new Date(year, mes, 1);

      while (date.getMonth() === mes) {
        if (date.getDay() === dia) {
          fechas.push(date.toLocaleDateString('es-CO'));
        }
        date.setDate(date.getDate() + 1);
      }
      fechasPorMes.push(fechas);
    }

    return fechasPorMes;
  }

  createMonthGroup(month: Month): FormGroup {
    return this.fb.group({
      completed: [month.completed],
      subtasks: this.fb.array(
        month.subtasks.map(subtask => this.fb.control(subtask.completed))
      )
    });
  }

  get monthsArray(): FormArray {
    return this.form.get('months') as FormArray;
  }

  get nameField() {
    return this.form.get('name');
  }

  get emailField() {
    return this.form.get('email');
  }

  get plateField() {
    return this.form.get('plate');
  }

  getSubtasksControls(monthGroup: AbstractControl): FormControl[] {
    return (monthGroup.get('subtasks') as FormArray).controls as FormControl[];
  }

  getMonthGroup(index: number): FormGroup {
    return this.monthsArray.at(index) as FormGroup;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase().slice(0, 7);
    this.form.get('plate')?.setValue(input.value, { emitEvent: false });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('Formulario válido:', this.form.value);
  }

  onMesSeleccionado(index: number): void {
    const monthGroup = this.monthsArray.at(index);
    const completed = monthGroup.get('completed')?.value;
    const subtasks = monthGroup.get('subtasks') as FormArray;
    subtasks.controls.forEach(control => control.setValue(completed));
  }

  updateSubtask(monthIndex: number, subtaskIndex: number, value: boolean) {
    const subtasksArray = this.monthsArray
      .at(monthIndex)
      .get('subtasks') as FormArray;
    subtasksArray.at(subtaskIndex).setValue(value);
  }

  // obtenerDatos(): void {
  //   const payload = {};
  //   this.formularioService.obtenerFormularioCompleto(payload).subscribe({
  //     next: data => console.log('Respuesta API:', data),
  //     error: error => console.error('Error:', error),
  //   });
  // }
}
