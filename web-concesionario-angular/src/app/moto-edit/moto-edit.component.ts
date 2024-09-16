import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Moto, MotoService } from '../services/moto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-moto-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './moto-edit.component.html',
  styleUrls: ['./moto-edit.component.css']
})
export class MotoEditComponent implements OnInit {
  moto: Moto = { id: 0, name: '', description: '', price: 0, image: '', category: 'motocicleta' }; 
  isEditMode = false;
  itemId: number | null = null; // Cambiar a número

  constructor(
    private route: ActivatedRoute,
    private motoService: MotoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const action = params['action'];
      this.itemId = +params['id'] || null; 

      if (action === 'edit' && this.itemId) {
        this.isEditMode = true;
        this.motoService.getMoto(this.itemId).subscribe({
          next: data => {
            if (data) {
              this.moto = { ...data }; 
            } else {
              console.error('Moto no encontrada');
              this.snackBar.open('Moto no encontrada', 'Cerrar', { duration: 3000 });
            }
          },
          error: error => {
            console.error('Error al cargar la moto:', error);
            this.snackBar.open('Error al cargar la moto', 'Cerrar', { duration: 3000 });
          }
        });
      } else if (action === 'create') {
        this.isEditMode = false;
        this.moto = { id: 0, name: '', description: '', price: 0, image: '', category: 'motocicleta' }; // Inicializa el id como número y establece la categoría
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode && this.itemId !== null) {
      this.motoService.updateMoto(this.itemId, this.moto).subscribe({
        next: () => {
          this.snackBar.open('Moto actualizada exitosamente!', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/gallery']);
        },
        error: error => {
          this.snackBar.open('Error al actualizar la moto', 'Cerrar', { duration: 3000 });
          console.error('Error al actualizar la moto:', error);
        }
      });
    } else {
      this.motoService.createMoto(this.moto).subscribe({
        next: () => {
          this.snackBar.open('Nueva moto creada exitosamente!', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/gallery']);
        },
        error: error => {
          this.snackBar.open('Error al crear la moto', 'Cerrar', { duration: 3000 });
          console.error('Error al crear la moto:', error);
        }
      });
    }
  }
}
