import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Vehicle {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string; // "auto", "moto", "pesado"
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
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
          console.log('Autos:', this.autos); // Verificar autos
          console.log('Motos:', this.motos); // Verificar motos
          console.log('Pesados:', this.pesados); // Verificar pesados
          this.loading = false;
        },
        error => {
          console.error('Error al cargar los datos:', error);
          this.loading = false;
        }
      );
  }
}
