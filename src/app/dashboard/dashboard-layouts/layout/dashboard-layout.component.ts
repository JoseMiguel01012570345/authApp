import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'layout',
  templateUrl: './dashboard-layout.component.html',
})
export class DashBoardLayoutComponent { 


  private authService = inject( AuthService )
  private router = inject(Router)
  public user = computed( () => this.authService.currentUser() )


  logout(){
    
    this.router.navigateByUrl('/auth/login')
    this.authService.logout()
    

  }

}

