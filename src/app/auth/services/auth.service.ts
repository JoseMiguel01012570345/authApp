import { computed, inject, Injectable, signal } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { User } from '../interfaces/user.interfaces';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { LoginResponse } from '../interfaces/login-response.interfaces';
import { CheckTokenResponse } from '../interfaces/check-token-status.interfaces';
import { RegisterResponse } from '../interfaces/register-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl : string = environments.baseURL
  private http = inject( HttpClient )

  private _currentUser = signal<User | null>(null)
  private _authStatus = signal<AuthStatus>(AuthStatus.checking)

  constructor() { 
    this.checkAuthStatus().subscribe( (s)=>console.log(s))
    
  }


  public currentUser = computed( ()=> this._currentUser() )
  public AuthStatus = computed<AuthStatus>( ()=> this._authStatus() )

  private setAuthentication( user:User , token:string ):boolean{
    
    this._currentUser.set(user)
    this._authStatus.set(AuthStatus.authtenticated)
    localStorage.setItem('token',token)

    return true 

  }

  register( username:string , email:string , password:string ):Observable<boolean>{
    
    const body = { name:username , email , password }
    return this.http.post<RegisterResponse>(`${this.baseUrl}/auth/register` , body).pipe(
      
      switchMap(() => 
        this.login(email, password).pipe(
            map(success => {
                if (success)  return true;
                 else {
                    console.log('Login failed'); // Handle login failure
                    return false;
                }
            })
        )
    ),) 
  }

  logout(){
    this._currentUser.set(null)
    this._authStatus.set( AuthStatus.noAuthtenticated )
    localStorage.removeItem('token')
  }

  login( email:string , password:string ):Observable<boolean>{
    
    const url = `${this.baseUrl}/auth/login`

    const body = { email , password }

    return this.http.post<LoginResponse>(url,body).pipe(

      map( ( {user,token} ) => this.setAuthentication( user , token ) ),
      catchError( (err) => {
        return err
        
      } ),
      map(()=> false)
    )
  }
  
  checkAuthStatus():Observable<boolean>{
  
    const url = `${this.baseUrl}/auth/check-token`
    const token = localStorage.getItem('token')
    if(!token)return of(false)
   
    const headers = new HttpHeaders()
    .set('Authorization' , `Bearer ${token}` )

    return this.http.get<CheckTokenResponse>(url,{headers}).pipe(
      
      map(
        
        ({user,token} ) => this.setAuthentication( user , token ) ),
      // ERROR
      catchError(()=>{
          
        this._authStatus.set( AuthStatus.noAuthtenticated )
        return of(false)
        
      })
    )

  }


}
