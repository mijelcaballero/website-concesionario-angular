import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { PesadoService, Pesado } from '../services/pesado.service';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  quantity: number = 1; // Inicializa la cantidad por defecto
  itemQuantity: number = 0; // Cantidad del artículo en el carrito

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private pesadoService: PesadoService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const numericId = Number(id);
      this.pesado$ = this.pesadoService.getPesado(numericId);
      this.pesado$.subscribe({
        next: (pesado) => {
          this.loading = false;
          if (pesado) {
            this.itemQuantity = this.cartService.getItemQuantity(pesado.id); // Obtener la cantidad del carrito
          }
        },
        error: (error) => {
          console.error('Error al cargar los detalles del pesado:', error);
          this.loading = false;
        }
      });
    } else {
      console.error('ID no encontrado');
      this.loading = false;
    }
  }

  addToCart(pesado: Pesado) {
    if (this.quantity < 1) {
      this.quantity = 1;
    }
    this.cartService.addToCart(pesado, this.quantity);
    this.snackBar.open(`${pesado.name} ha sido agregado al carrito!`, 'Cerrar', {
      duration: 3000,
    });
    this.itemQuantity = this.cartService.getItemQuantity(pesado.id); // Actualizar la cantidad después de agregar
  }

  deletePesado(id: number) {
    this.pesadoService.deletePesado(id).subscribe(() => {
      console.log('Pesado eliminado con éxito');
      this.router.navigate(['/gallery']); // Redirigir a la galería después de eliminar
    }, error => {
      console.error('Error al eliminar el pesado:', error);
    });
  }

  updatePesado(id: number) {
    this.router.navigate(['/pesado-edit'], { queryParams: { action: 'edit', id: id } });
  }
}
