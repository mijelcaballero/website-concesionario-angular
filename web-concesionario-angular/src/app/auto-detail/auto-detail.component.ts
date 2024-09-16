import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { AutoService, Auto } from '../services/auto.service';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auto-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './auto-detail.component.html',
  styleUrls: ['./auto-detail.component.css']
})

export class AutoDetailComponent implements OnInit {
  
  auto$: Observable<Auto | null> | null = null;
  loading = true;
  quantity: number = 1; // Inicializa la cantidad por defecto
  itemQuantity: number = 0; // Cantidad del artículo en el carrito

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private autoService: AutoService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const numericId = Number(id); 
      this.auto$ = this.autoService.getAuto(numericId);
      this.auto$.subscribe({
        next: (auto) => {
          this.loading = false;
          if (auto) {
            this.itemQuantity = this.cartService.getItemQuantity(auto.id); // Obtener la cantidad del carrito
          }
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

  addToCart(auto: Auto) {
    //cantidad sea siempre positiva
    if (this.quantity < 1) {
      this.quantity = 1;
    }
    this.cartService.addToCart(auto, this.quantity);
    this.snackBar.open(`${auto.name} ha sido agregado al carrito!`, 'Cerrar', {
      duration: 3000,
    });
    this.itemQuantity = this.cartService.getItemQuantity(auto.id); // Actualizar la cantidad después de agregar
  }

  deleteAuto(id: number) { 
    this.autoService.deleteAuto(id).subscribe(() => {
      console.log('Auto eliminado con éxito');
      this.router.navigate(['/gallery']); // Redirigir a la galería después de eliminar
    }, error => {
      console.error('Error al eliminar el auto:', error);
    });
  }

  updateAuto(id: number) { 
    // Redirige al formulario de edición con el ID del auto
    this.router.navigate(['/auto-edit'], { queryParams: { action: 'edit', id: id } });
  }
}
