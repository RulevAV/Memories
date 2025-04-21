import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (!!authService.user) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/');
};
