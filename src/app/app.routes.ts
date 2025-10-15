import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home'
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
    path:'**',
    redirectTo:'home'
  }
];
