import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://localhost:8080/api/v1/clientes/authenticate'; //URL de API REST Spring Boot
  private authenticated = new BehaviorSubject<boolean>(false); // Estado de autenticación

  constructor(private http: HttpClient) {}

  // Método para autenticar al usuario
  authenticate(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(this.apiUrl, { email: username, passw: password }).pipe(
      map(response => {
        const isAuthenticated = response.success; 
        this.authenticated.next(isAuthenticated); // Actualiza el estado de autenticación
        return isAuthenticated;
      }),
      catchError(() => {
        this.authenticated.next(false);
        return of(false); // Devuelve false en caso de error
      })
    );
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): Observable<boolean> {
    return this.authenticated.asObservable();
  }

  // Método para cerrar sesión
  logout(): void {
    this.authenticated.next(false); // Actualiza el estado de autenticación a no autenticado
  }
}