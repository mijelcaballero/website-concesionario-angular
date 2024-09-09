import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { MotoService, Moto } from '../services/moto.service';
import { CartService } from '../services/cart.service'; // Importa el CartService
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
      this.moto$ = this.motoService.getMotoById(id);
      this.moto$.subscribe({
        next: () => this.loading = false,
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
    this.cartService.addToCart(moto);
    this.snackBar.open(`${moto.name} ha sido agregado al carrito!`, 'Cerrar', {
      duration: 3000,
    });
  }

  deleteMoto(id: string) {
    this.motoService.deleteMoto(id).then(() => {
      console.log('Moto eliminada con éxito');
      this.snackBar.open(`Moto eliminada con éxito`, 'Cerrar', {
        duration: 3000,
      });
    }).catch(error => {
      console.error('Error al eliminar la moto:', error);
      this.snackBar.open(`Error al eliminar la moto`, 'Cerrar', {
        duration: 3000,
      });
    });
  }

  updateMoto(id: string, moto: Partial<Moto>) {
    // Redirige al formulario de edición con el ID de la moto
    this.router.navigate(['/moto-edit'], { queryParams: { action: 'edit', id: id } });
  }
}
