import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LabsComponent } from './pages/labs/labs.component';

export const routes: Routes = [
  {
    // routes recibe un array de objetos con las rutas de la aplicación y sus componentes asociados
    // path: 'home',
    path: '', // si el path es vacío será la ruta por defecto
    component: HomeComponent
  },
  {
    path: 'labs',
    component: LabsComponent
  }
];
