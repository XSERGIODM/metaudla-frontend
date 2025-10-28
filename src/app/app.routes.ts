import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home'),

  },
  {
    path: 'islas',
    loadComponent: () => import('./pages/isla-page/isla-page'),
    children: [
      {
        path: 'isla/:key',
        loadComponent: () => import('./pages/isla-detalle/isla-detalle'),
      },
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page')
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about-page/about-page')
  },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/perfil-usuario-page/perfil-usuario-page'),
    canActivate: [authGuard]
  },
  {
    path: 'mis-islas',
    loadComponent: () => import('./pages/mi-islas-page/mi-islas-page'),
    canActivate: [authGuard]
  },
  {
    path: 'dashboard-admin',
    loadComponent: () => import('./pages/dashboard-admin-page/dashboard-admin-page'),
    canActivate: [authGuard],
  },
  {
    path:'**',
    redirectTo:'home'
  }
];
