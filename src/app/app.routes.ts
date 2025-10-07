import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {IslaPage} from './pages/isla-page/isla-page';
import {LoginPage} from './pages/login-page/login-page';

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
];
