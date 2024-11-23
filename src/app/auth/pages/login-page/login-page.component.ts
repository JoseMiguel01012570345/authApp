import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent { 

  myForm: FormGroup;
  private AuthService = inject(AuthService)

  constructor( private fb: FormBuilder ){

    this.myForm= this.fb.group({
      
      email: ['jhosefperez@gmail.com', Validators.required ],
      password: ['' , Validators.required, Validators.minLength(6)],
  
    })
  }

  login(){

    const {email , password } = this.myForm.value
    this.AuthService.login( email , password ).subscribe(
      {
        next: ()  => console.log('ok'),
        error: (error)  => {
          Swal.fire('Error' , error.message , 'error' )
        }
        
      }
    )
  }

}
