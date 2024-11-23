import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent { 

  myForm: FormGroup;
  private AuthService = inject(AuthService)
  private router = inject(Router)

  constructor( private fb: FormBuilder ){

    this.myForm= this.fb.group({
      
      email: ['', Validators.required ],
      password: ['' , Validators.required, Validators.minLength(6)],
  
    })
  }

  login(){

    const {email , password } = this.myForm.value
    this.AuthService.login( email , password ).subscribe(
      {
        next: ()  => this.router.navigateByUrl('/dashboard'),
        error: (error)  => {
          Swal.fire('Error' , error.message , 'error' )
        }
        
      }
    )
  }

}
