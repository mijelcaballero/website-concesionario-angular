import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Auto {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  category: string; // "auto"
}

@Component({
  selector: 'app-auto-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './auto-detail.component.html',
  styleUrls: ['./auto-detail.component.css']
})
export class AutoDetailComponent implements OnInit {
  auto: Auto | null = null;
  loading = true;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get<{ autos: Auto[] }>('/assets/concesionario.json').subscribe({
        next: (data) => {
          // Busca el auto por ID
          this.auto = data.autos.find(item => item.id === parseInt(id)) || null;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar los detalles del auto:', error);
          this.loading = false;
        }
      });
    } else {
      console.error('ID no encontrado');
      this.loading = false;
    }
  }
}
