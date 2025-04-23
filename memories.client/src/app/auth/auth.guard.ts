import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../services/core/authentication.service';


const qwe = () => {
  const authenticationService = inject(AuthenticationService);
  const p = new Promise(resolve => {
    authenticationService.user$.subscribe(u=>
    {
        if ( u === undefined)
          return;

        resolve(u)
    })
  });
  return p;
}

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const user = await qwe();
  if (user) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/');
};
