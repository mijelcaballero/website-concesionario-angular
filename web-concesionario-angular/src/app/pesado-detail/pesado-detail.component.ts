import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Pesado {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  category: string; // "pesado"
}

@Component({
  selector: 'app-pesado-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pesado-detail.component.html',
  styleUrls: ['./pesado-detail.component.css']
})
export class PesadoDetailComponent implements OnInit {
  pesado: Pesado | null = null;
  loading = true;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get<{ pesados: Pesado[] }>('/assets/concesionario.json').subscribe({
        next: (data) => {
          // Busca el vehículo pesado por ID
          this.pesado = data.pesados.find(item => item.id === parseInt(id)) || null;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar los detalles del vehículo pesado:', error);
          this.loading = false;
        }
      });
    } else {
      console.error('ID no encontrado');
      this.loading = false;
    }
  }
}
