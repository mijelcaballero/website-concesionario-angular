import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { MotoService, Moto } from '../services/moto.service';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-moto-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './moto-detail.component.html',
  styleUrls: ['./moto-detail.component.css']
})
export class MotoDetailComponent implements OnInit {
  
  moto$: Observable<Moto | null> | null = null;
  loading = true;
  quantity: number = 1; // Inicializa la cantidad por defecto
  itemQuantity: number = 0; // Cantidad del artículo en el carrito

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private motoService: MotoService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const numericId = Number(id);
      this.moto$ = this.motoService.getMoto(numericId);
      this.moto$.subscribe({
        next: (moto) => {
          this.loading = false;
          if (moto) {
            this.itemQuantity = this.cartService.getItemQuantity(moto.id); // Obtener la cantidad del carrito
          }
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

  addToCart(moto: Moto) {
    if (this.quantity < 1) {
      this.quantity = 1;
    }
    this.cartService.addToCart(moto, this.quantity);
    this.snackBar.open(`${moto.name} ha sido agregado al carrito!`, 'Cerrar', {
      duration: 3000,
    });
    this.itemQuantity = this.cartService.getItemQuantity(moto.id); // Actualizar la cantidad después de agregar
  }

  deleteMoto(id: number) {
    this.motoService.deleteMoto(id).subscribe(() => {
      console.log('Moto eliminada con éxito');
      this.router.navigate(['/gallery']); // Redirigir a la galería después de eliminar
    }, error => {
      console.error('Error al eliminar la moto:', error);
    });
  }

  updateMoto(id: number) {
    this.router.navigate(['/moto-edit'], { queryParams: { action: 'edit', id: id } });
  }
}
