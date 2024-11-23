import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  public myForm: FormGroup
  private authService = inject(AuthService)

  constructor( private fb:FormBuilder ){
    this.myForm= this.fb.group({
      username: ['' , [ Validators.required ] ],
      email: ['', Validators.required ],
      password: ['' , Validators.required, Validators.minLength(6)],
  })

    }

    register(){

      const { username, email, password } = this.myForm.value
      
      this.authService.register( username , email , password ).subscribe(
        {
          error: (error) => {
            console.log(error.error)
          Swal.fire('Error' , error.error.message[0] , 'error' )
        }
      })
      }
 }
