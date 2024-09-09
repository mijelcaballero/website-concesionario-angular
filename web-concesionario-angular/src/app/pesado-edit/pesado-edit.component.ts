import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PesadoService, Pesado } from '../services/pesado.service'; // Importa PesadoService
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pesado-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pesado-edit.component.html',
  styleUrls: ['./pesado-edit.component.css']
})
export class PesadoEditComponent implements OnInit {
  pesado: Pesado = { id: '', name: '', description: '', price: 0, image: '' };
  isEditMode = false;
  itemId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private pesadoService: PesadoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const action = params['action'];
      this.itemId = params['id'] || null;

      if (action === 'edit' && this.itemId) {
        this.isEditMode = true;
        this.pesadoService.getPesadoById(this.itemId).subscribe(data => {
          if (data) {
            this.pesado = { ...data };
          } else {
            console.error('Pesado no encontrado');
            this.snackBar.open('Pesado no encontrado', 'Cerrar', { duration: 3000 });
          }
        }, error => {
          console.error('Error al cargar el pesado:', error);
          this.snackBar.open('Error al cargar el pesado', 'Cerrar', { duration: 3000 });
        });
      } else if (action === 'create') {
        this.isEditMode = false;
        this.pesado = { id: '', name: '', description: '', price: 0, image: '' };
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode && this.itemId) {
      this.pesadoService.updatePesado(this.itemId, this.pesado).then(() => {
        this.snackBar.open('Pesado actualizado exitosamente!', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/pesados']);
      }).catch(error => {
        this.snackBar.open('Error al actualizar el pesado', 'Cerrar', { duration: 3000 });
        console.error('Error al actualizar el pesado:', error);
      });
    } else {
      this.pesado.id = this.pesado.id || this.generateId();
      this.pesadoService.createPesado(this.pesado).then(() => {
        this.snackBar.open('Nuevo pesado creado exitosamente!', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/pesados']);
      }).catch(error => {
        this.snackBar.open('Error al crear el pesado', 'Cerrar', { duration: 3000 });
        console.error('Error al crear el pesado:', error);
      });
    }
  }

  private generateId(): string {
    return 'pesado-' + Math.random().toString(36).substr(2, 9);
  }
}
