import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AutoDetailComponent } from './auto-detail/auto-detail.component';
import { AutoEditComponent } from './auto-edit/auto-edit.component';
import { MotoDetailComponent } from './moto-detail/moto-detail.component';
import { MotoEditComponent } from './moto-edit/moto-edit.component';
import { PesadoDetailComponent } from './pesado-detail/pesado-detail.component';
import { PesadoEditComponent } from './pesado-edit/pesado-edit.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactosComponent } from './contactos/contactos.component'; 
import { NosotrosComponent } from './nosotros/nosotros.component';

import { AuthGuard } from './guards/auth.guard'; // Importa el guardián de autenticación
import { InvoiceComponent } from './invoice/invoice.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'invoice', component: InvoiceComponent},
  { path: 'cart', component: CartComponent},
  { path: 'gallery', component: GalleryComponent },
  { path: 'autos/:id', component: AutoDetailComponent },
  { path: 'auto-edit', component: AutoEditComponent},

  { path: 'motos/:id', component: MotoDetailComponent },
  { path: 'moto-edit', component: MotoEditComponent},
  { path: 'pesados/:id', component: PesadoDetailComponent },
  { path: 'pesado-edit', component: PesadoEditComponent},
  { path: 'contactos', component: ContactosComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: '**', component: NotFoundComponent },
];
