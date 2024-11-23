import { User } from './user.interfaces';
import { LoginPageComponent } from '../pages/login-page/login-page.component';


export interface LoginResponse{
    user:User
    token:string
}