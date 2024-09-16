import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auto, AutoService } from '../services/auto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auto-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auto-edit.component.html',
  styleUrls: ['./auto-edit.component.css']
})
export class AutoEditComponent implements OnInit {
  auto: Auto = { id: 0, name: '', description: '', price: 0, image: '', category: 'vehiculo' }; // Inicializa el id como número
  isEditMode = false;
  itemId: number | null = null; // Cambiar a número

  constructor(
    private route: ActivatedRoute,
    private autoService: AutoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const action = params['action'];
      this.itemId = +params['id'] || null; 

      if (action === 'edit' && this.itemId) {
        this.isEditMode = true;
        this.autoService.getAuto(this.itemId).subscribe({
          next: data => {
            if (data) {
              this.auto = { ...data }; 
            } else {
              console.error('Auto no encontrado');
              this.snackBar.open('Auto no encontrado', 'Cerrar', { duration: 3000 });
            }
          },
          error: error => {
            console.error('Error al cargar el auto:', error);
            this.snackBar.open('Error al cargar el auto', 'Cerrar', { duration: 3000 });
          }
        });
      } else if (action === 'create') {
        this.isEditMode = false;
        this.auto = { id: 0, name: '', description: '', price: 0, image: '', category: 'vehiculo' }; // Inicializa el id como número y establece la categoría
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode && this.itemId !== null) {
      this.autoService.updateAuto(this.itemId, this.auto).subscribe({
        next: () => {
          this.snackBar.open('Auto actualizado exitosamente!', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/gallery']);
        },
        error: error => {
          this.snackBar.open('Error al actualizar el auto', 'Cerrar', { duration: 3000 });
          console.error('Error al actualizar el auto:', error);
        }
      });
    } else {
      // Solo se envía el auto sin ID para la creación. El ID se genera automáticamente en la base de datos.
      this.autoService.createAuto(this.auto).subscribe({
        next: () => {
          this.snackBar.open('Nuevo auto creado exitosamente!', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/gallery']);
        },
        error: error => {
          this.snackBar.open('Error al crear el auto', 'Cerrar', { duration: 3000 });
          console.error('Error al crear el auto:', error);
        }
      });
    }
  }
}
