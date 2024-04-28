import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent() {
      return import('./core/component/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      );
    },
    pathMatch: 'full',
  },
  {
    path: 'inserimento-pazienti',
    loadComponent() {
      return import(
        './core/component/inserimento-pazienti/inserimento-pazienti.component'
      ).then((m) => m.InserimentoPazientiComponent);
    },
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
];
