import { Component, OnInit } from '@angular/core';
import { AutoService, Auto } from '../services/auto.service';
import { MotoService, Moto } from '../services/moto.service';
import { PesadoService, Pesado } from '../services/pesado.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  autos$: Observable<Auto[]> = of([]); // Inicializa con un Observable vacío
  motos$: Observable<Moto[]> = of([]); // Inicializa con un Observable vacío
  pesados$: Observable<Pesado[]> = of([]); // Inicializa con un Observable vacío
  loading = true;

  constructor(
    private autoService: AutoService,
    private motoService: MotoService,
    private pesadoService: PesadoService
  ) {}

  ngOnInit(): void {
    this.autos$ = this.autoService.getAutos();
    this.motos$ = this.motoService.getMotos();
    this.pesados$ = this.pesadoService.getPesados();

    // Cambia el loading una vez que los datos se han cargado
    this.autos$.subscribe(() => this.loading = false);
    this.motos$.subscribe(() => this.loading = false);
    this.pesados$.subscribe(() => this.loading = false);
  }
}
