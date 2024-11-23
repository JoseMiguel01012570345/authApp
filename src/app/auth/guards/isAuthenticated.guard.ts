import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService)

  if( authService.AuthStatus() === AuthStatus.authtenticated ){
    return true;
  }

  const router = inject(Router)

  router.navigateByUrl('/auth/login')
  return false
};
