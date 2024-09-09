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
  auto: Auto = { id: '', name: '', description: '', price: 0, image: '' }; // Inicializa el id
  isEditMode = false;
  itemId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private autoService: AutoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const action = params['action'];
      this.itemId = params['id'] || null;

      if (action === 'edit' && this.itemId) {
        this.isEditMode = true;
        this.autoService.getAutoById(this.itemId).subscribe(data => {
          if (data) {
            this.auto = { ...data }; // Asegúrate de que el objeto auto incluya el id
          } else {
            console.error('Auto no encontrado');
            this.snackBar.open('Auto no encontrado', 'Cerrar', { duration: 3000 });
          }
        }, error => {
          console.error('Error al cargar el auto:', error);
          this.snackBar.open('Error al cargar el auto', 'Cerrar', { duration: 3000 });
        });
      } else if (action === 'create') {
        this.isEditMode = false;
        this.auto = { id: '', name: '', description: '', price: 0, image: '' }; // Inicializa el id
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode && this.itemId) {
      this.autoService.updateAuto(this.itemId, this.auto).then(() => {
        this.snackBar.open('Auto actualizado exitosamente!', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/autos']);
      }).catch(error => {
        this.snackBar.open('Error al actualizar el auto', 'Cerrar', { duration: 3000 });
        console.error('Error al actualizar el auto:', error);
      });
    } else {
      this.auto.id = this.auto.id || this.generateId(); // Genera un id si es nuevo
      this.autoService.createAuto(this.auto).then(() => {
        this.snackBar.open('Nuevo auto creado exitosamente!', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/autos']);
      }).catch(error => {
        this.snackBar.open('Error al crear el auto', 'Cerrar', { duration: 3000 });
        console.error('Error al crear el auto:', error);
      });
    }
  }

  private generateId(): string {
    // Implementa tu lógica para generar un ID único
    return 'auto-' + Math.random().toString(36).substr(2, 9);
  }
}
