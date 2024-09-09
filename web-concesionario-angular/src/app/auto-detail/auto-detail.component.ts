import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutoService, Auto } from '../services/auto.service';
import { CartService } from '../services/cart.service'; // Importa el CartService
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

  constructor(
    private route: ActivatedRoute,
    private autoService: AutoService,
    private cartService: CartService, // Inyecta el CartService
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.auto$ = this.autoService.getAutoById(id);
      this.auto$.subscribe({
        next: () => this.loading = false,
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
    this.cartService.addToCart(auto);
    this.snackBar.open(`${auto.name} ha sido agregado al carrito!`, 'Cerrar', {
      duration: 3000, // Tiempo que la notificación permanecerá visible (en milisegundos)
    });
    
  }

  deleteAuto(id: string) {
    this.autoService.deleteAuto(id).then(() => {
      console.log('Auto eliminado con éxito');
      // Redirigir o mostrar un mensaje de éxito
    }).catch(error => {
      console.error('Error al eliminar el auto:', error);
    });
  }

  updateAuto(id: string, auto: Partial<Auto>) {
    this.autoService.updateAuto(id, auto).then(() => {
      console.log('Auto actualizado con éxito');
      // Redirigir o mostrar un mensaje de éxito
    }).catch(error => {
      console.error('Error al actualizar el auto:', error);
    });
  }
}
