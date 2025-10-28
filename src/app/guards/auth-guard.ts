import {CanActivateFn, Router} from '@angular/router';
import { AuthService } from "../service/auth-service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirigir al login y guardar la URL intentada
  router.navigate(['/login'], {
    queryParams: {returnUrl: state.url}
  }).then(r =>
    console.log(r)
  );
  return false;
};
