import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pesado, PesadoService } from '../services/pesado.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pesado-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pesado-edit.component.html',
  styleUrls: ['./pesado-edit.component.css']
})
export class PesadoEditComponent implements OnInit {
  pesado: Pesado = { id: 0, name: '', description: '', price: 0, image: '', category: 'pesado' }; 
  isEditMode = false;
  itemId: number | null = null; // Cambiar a número

  constructor(
    private route: ActivatedRoute,
    private pesadoService: PesadoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const action = params['action'];
      this.itemId = +params['id'] || null; 

      if (action === 'edit' && this.itemId) {
        this.isEditMode = true;
        this.pesadoService.getPesado(this.itemId).subscribe({
          next: data => {
            if (data) {
              this.pesado = { ...data }; // Asegúrate de que el objeto pesado incluya la categoría
            } else {
              console.error('Pesado no encontrado');
              this.snackBar.open('Pesado no encontrado', 'Cerrar', { duration: 3000 });
            }
          },
          error: error => {
            console.error('Error al cargar el pesado:', error);
            this.snackBar.open('Error al cargar el pesado', 'Cerrar', { duration: 3000 });
          }
        });
      } else if (action === 'create') {
        this.isEditMode = false;
        this.pesado = { id: 0, name: '', description: '', price: 0, image: '', category: 'pesado' }; 
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode && this.itemId !== null) {
      this.pesadoService.updatePesado(this.itemId, this.pesado).subscribe({
        next: () => {
          this.snackBar.open('Pesado actualizado exitosamente!', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/gallery']);
        },
        error: error => {
          this.snackBar.open('Error al actualizar el pesado', 'Cerrar', { duration: 3000 });
          console.error('Error al actualizar el pesado:', error);
        }
      });
    } else {
      this.pesadoService.createPesado(this.pesado).subscribe({
        next: () => {
          this.snackBar.open('Nuevo pesado creado exitosamente!', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/gallery']);
        },
        error: error => {
          this.snackBar.open('Error al crear el pesado', 'Cerrar', { duration: 3000 });
          console.error('Error al crear el pesado:', error);
        }
      });
    }
  }
}
