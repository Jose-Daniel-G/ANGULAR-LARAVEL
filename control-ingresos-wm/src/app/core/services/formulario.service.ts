// src/app/core/services/formulario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // ¡Importa HttpClient!
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Este servicio se provee a nivel de la aplicación raíz
})
export class FormularioService {
  private apiUrl = 'https://servicios.cali.gov.co:9090/PortalApp/rest/api/Formulario/getFormularioComplete';

  constructor(private http: HttpClient) { } // Inyección normal de HttpClient

  getFormularioComplete(idFormulario: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const payload = { idFormulario: idFormulario };

    return this.http.post<any>(this.apiUrl, payload, { headers: headers });
  }
}