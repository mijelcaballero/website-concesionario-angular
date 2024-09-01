import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Definimos la interfaz para vehículos
interface Vehicle {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string; // "auto", "moto", "pesado"
  price: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  autos: Vehicle[] = [];
  motos: Vehicle[] = [];
  pesados: Vehicle[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ autos: Vehicle[], motos: Vehicle[], pesados: Vehicle[] }>('/assets/concesionario.json')
      .subscribe(
        data => {
          this.autos = data.autos;
          this.motos = data.motos;
          this.pesados = data.pesados;
          this.loading = false;
        },
        error => {
          console.error('Error al cargar los datos:', error);
          this.loading = false;
        }
      );
  }
}
