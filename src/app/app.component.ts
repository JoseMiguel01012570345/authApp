import { Component, computed, effect, inject } from '@angular/core';
import { AuthStatus } from './auth/interfaces/auth-status.enum';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'auth-app';

  private authService = inject( AuthService )
  private router = inject(Router)
  
  public finishAuthCheck = computed<boolean>(()=>{

    if( this.authService.AuthStatus() === AuthStatus.checking )
      return false
    
    return true
  })
  
  private authStatusChanges = effect(()=>{

    if ( this.authService.AuthStatus() == AuthStatus.authtenticated ){
      this.router.navigateByUrl('/dashboard')
    }
    
    if ( this.authService.AuthStatus() == AuthStatus.noAuthtenticated ){
      this.router.navigateByUrl('/auth/login')
    }

  })



}
