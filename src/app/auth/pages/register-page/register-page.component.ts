import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  public myForm: FormGroup
  private authService = inject(AuthService)

  constructor( private fb:FormBuilder ){
    this.myForm= this.fb.group({
      username: ['jhosef' , [ Validators.required ] ],
      email: ['jhosefperez@gmail.com', Validators.required ],
      password: ['' , Validators.required, Validators.minLength(6)],
  })

    }

    register(){

      const { username, email, password } = this.myForm.value
      console.log('triggering registration')
      this.authService.register( username , email , password ).subscribe()

    }
 }
