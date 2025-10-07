import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {IslaPage} from './pages/isla-page/isla-page';
import {IslaDetalle} from './pages/isla-detalle/isla-detalle';
import {LoginPage} from './pages/login-page/login-page';
import {AboutPage} from './pages/about-page/about-page';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'islas',
    component: IslaPage
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'about',
    component: AboutPage
  },
  {
    path: 'isla/:islaId',
    component: IslaDetalle
  },
  {
    path:'**',
    redirectTo:'home'
  }
];
