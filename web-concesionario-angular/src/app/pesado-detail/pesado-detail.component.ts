import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PesadoService, Pesado } from '../services/pesado.service';
import { CartService } from '../services/cart.service'; // Importa el CartService
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pesado-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pesado-detail.component.html',
  styleUrls: ['./pesado-detail.component.css']
})
export class PesadoDetailComponent implements OnInit {
  pesado$: Observable<Pesado | null> | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private pesadoService: PesadoService,
    private cartService: CartService, // Inyecta el CartService
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pesado$ = this.pesadoService.getPesadoById(id);
      this.pesado$.subscribe({
        next: () => this.loading = false,
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

  addToCart(pesado: Pesado) {
    this.cartService.addToCart(pesado);
    this.snackBar.open(`${pesado.name} ha sido agregado al carrito!`, 'Cerrar', {
      duration: 3000,
    });
  }

  deletePesado(id: string) {
    this.pesadoService.deletePesado(id).then(() => {
      console.log('Vehículo pesado eliminado con éxito');
      // Redirigir o mostrar un mensaje de éxito
    }).catch(error => {
      console.error('Error al eliminar el vehículo pesado:', error);
    });
  }

  updatePesado(id: string, pesado: Partial<Pesado>) {
    this.pesadoService.updatePesado(id, pesado).then(() => {
      console.log('Vehículo pesado actualizado con éxito');
      // Redirigir o mostrar un mensaje de éxito
    }).catch(error => {
      console.error('Error al actualizar el vehículo pesado:', error);
    });
  }
}
