import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.interface';

export interface Auto extends Item {
  category: 'vehiculo';
}


@Injectable({
  providedIn: 'root'
})
export class AutoService {

  private apiUrl = 'http://localhost:8080/api/v1/autos'; // URL del endpoint en el backend de Spring Boot.

  constructor(private http: HttpClient) { }

  // Obtener todos los autos
  getAutos(): Observable<Auto[]> {
    return this.http.get<Auto[]>(this.apiUrl);
  }

  // Obtener un auto por ID
  getAuto(id: number): Observable<Auto> {
    return this.http.get<Auto>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo auto
  createAuto(auto: Auto): Observable<Auto> {
    return this.http.post<Auto>(this.apiUrl, auto);
  }

  // Actualizar un auto
  updateAuto(id: number, auto: Auto): Observable<Auto> {
    return this.http.put<Auto>(`${this.apiUrl}/${id}`, auto);
  }

  // Eliminar un auto
  deleteAuto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
