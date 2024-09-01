import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Moto {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  category: string; // "moto"
}

@Component({
  selector: 'app-moto-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './moto-detail.component.html',
  styleUrls: ['./moto-detail.component.css']
})
export class MotoDetailComponent implements OnInit {
  moto: Moto | null = null;
  loading = true;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get<{ motos: Moto[] }>('/assets/concesionario.json').subscribe({
        next: (data) => {
          // Busca la moto por ID
          this.moto = data.motos.find(item => item.id === parseInt(id)) || null;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar los detalles de la moto:', error);
          this.loading = false;
        }
      });
    } else {
      console.error('ID no encontrado');
      this.loading = false;
    }
  }
}
