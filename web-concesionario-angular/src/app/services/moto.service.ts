import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.interface';

export interface Moto extends Item {
  category: 'motocicleta';
}

@Injectable({
  providedIn: 'root'
})

export class MotoService {

  private apiUrl = 'http://localhost:8080/api/v1/motos';

  constructor(private http: HttpClient) { }

  // Obtener todas las motos
  getMotos(): Observable<Moto[]> {
    return this.http.get<Moto[]>(this.apiUrl);
  }

  // Obtener una moto por ID
  getMoto(id: number): Observable<Moto> {
    return this.http.get<Moto>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva moto
  createMoto(moto: Moto): Observable<Moto> {
    return this.http.post<Moto>(this.apiUrl, moto);
  }

  // Actualizar una moto
  updateMoto(id: number, moto: Moto): Observable<Moto> {
    return this.http.put<Moto>(`${this.apiUrl}/${id}`, moto);
  }

  // Eliminar una moto
  deleteMoto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
