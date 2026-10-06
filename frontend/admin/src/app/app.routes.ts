import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';

export const routes: Routes = [
  {
    path: '',
    component: Accueil
  },
  {
    path: 'accueil',
    component: Accueil
  },
  {
    path: '**',
    redirectTo: ''
  }
];
