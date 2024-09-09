import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MotoService, Moto } from '../services/moto.service'; // Importa MotoService
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-moto-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './moto-edit.component.html',
  styleUrls: ['./moto-edit.component.css']
})

export class MotoEditComponent implements OnInit {
  moto: Moto = { id: '', name: '', description: '', price: 0, image: '' };
  isEditMode = false;
  itemId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private motoService: MotoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const action = params['action'];
      this.itemId = params['id'] || null;

      if (action === 'edit' && this.itemId) {
        this.isEditMode = true;
        this.motoService.getMotoById(this.itemId).subscribe(data => {
          if (data) {
            this.moto = { ...data };
          } else {
            console.error('Moto no encontrado');
            this.snackBar.open('Moto no encontrado', 'Cerrar', { duration: 3000 });
          }
        }, error => {
          console.error('Error al cargar la moto:', error);
          this.snackBar.open('Error al cargar la moto', 'Cerrar', { duration: 3000 });
        });
      } else if (action === 'create') {
        this.isEditMode = false;
        this.moto = { id: '', name: '', description: '', price: 0, image: '' };
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode && this.itemId) {
      this.motoService.updateMoto(this.itemId, this.moto).then(() => {
        this.snackBar.open('Moto actualizada exitosamente!', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/motos']);
      }).catch(error => {
        this.snackBar.open('Error al actualizar la moto', 'Cerrar', { duration: 3000 });
        console.error('Error al actualizar la moto:', error);
      });
    } else {
      this.moto.id = this.moto.id || this.generateId();
      this.motoService.createMoto(this.moto).then(() => {
        this.snackBar.open('Nueva moto creada exitosamente!', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/motos']);
      }).catch(error => {
        this.snackBar.open('Error al crear la moto', 'Cerrar', { duration: 3000 });
        console.error('Error al crear la moto:', error);
      });
    }
  }

  private generateId(): string {
    return 'moto-' + Math.random().toString(36).substr(2, 9);
  }
}
