import { ApplicationConfig } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Configuración de Firebase 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3L6eX784qig6W3SXax8v_7VBYqrkZ56o",
  authDomain: "concesionario-app-68ded.firebaseapp.com",
  projectId: "concesionario-app-68ded",
  storageBucket: "concesionario-app-68ded.appspot.com",
  messagingSenderId: "492639777209",
  appId: "1:492639777209:web:2e7dfed91d1fb5e6850668",
  measurementId: "G-XQWXVF3QK4"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    RouterModule,
    // Inicialización de Firebase y servicios
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    NavigationBarComponent, provideAnimationsAsync(), provideAnimationsAsync()
  ],
};