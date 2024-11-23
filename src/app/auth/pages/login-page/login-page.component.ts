import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent { 

  myForm: FormGroup;

  constructor( private fb: FormBuilder ){

    this.myForm= this.fb.group({
      
      email: ['', Validators.required ],
      password: ['' , Validators.required, Validators.minLength(6)],
  
    })
  }

  login(){
    
  }

}
