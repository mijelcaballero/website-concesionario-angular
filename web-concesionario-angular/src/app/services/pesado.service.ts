import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.interface';

export interface Pesado extends Item {
  category: 'pesado';
}

@Injectable({
  providedIn: 'root'
})
export class PesadoService {

  private apiUrl = 'http://localhost:8080/api/v1/pesados'; 

  constructor(private http: HttpClient) { }

  // Obtener todos los pesados
  getPesados(): Observable<Pesado[]> {
    return this.http.get<Pesado[]>(this.apiUrl);
  }

  // Obtener un pesado por ID
  getPesado(id: number): Observable<Pesado> {
    return this.http.get<Pesado>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo pesado
  createPesado(pesado: Pesado): Observable<Pesado> {
    return this.http.post<Pesado>(this.apiUrl, pesado);
  }

  // Actualizar un pesado
  updatePesado(id: number, pesado: Pesado): Observable<Pesado> {
    return this.http.put<Pesado>(`${this.apiUrl}/${id}`, pesado);
  }

  // Eliminar un pesado
  deletePesado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
