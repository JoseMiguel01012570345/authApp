import { computed, inject, Injectable, signal } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { User } from '../interfaces/user.interfaces';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { LoginResponse } from '../interfaces/login-response.interfaces';
import { CheckTokenResponse } from '../interfaces/check-token-status.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl : string = environments.baseURL
  private http = inject( HttpClient )

  private _currentUser = signal<User | null>(null)
  private _authStatus = signal<AuthStatus>(AuthStatus.checking)

  constructor() { }


  public currentUser = computed( ()=> this._currentUser() )
  public AuthStatus = computed( ()=> this._authStatus() )

  login( email:string , password:string ):Observable<boolean>{
    
    const url = `${this.baseUrl}/auth/login`

    const body = { email , password }

    return this.http.post<LoginResponse>(url,body).pipe(

      tap( ( {user,token} ) => {

        this._currentUser.set(user)
        this._authStatus.set(AuthStatus.authtenticated)
        localStorage.setItem('token',token)
      } ),
      map( () => true ),
      catchError( (err) => {
        return err
      
      } ),
      map(()=> false)

    )

  }

  checkAuthStatus():Observable<boolean>{

    const url = `${this.baseUrl}/auth/check`
    const token = localStorage.getItem('token')
    if(!token)return of(true)
   
    const headers = new HttpHeaders()
    .set('Authorization' , `Bearer ${token}` )

    return this.http.get<CheckTokenResponse>(url,{headers}).pipe(
      
      map(
      
        ({user,token} ) => {

          this._currentUser.set(user)
          this._authStatus.set(AuthStatus.authtenticated)
          localStorage.setItem('token',token)
          
          return true
        }),
      // ERROR
      catchError(()=>{
          
        this._authStatus.set( AuthStatus.noAuthtenticated )
        return of(false)
        
      })
    )

  }


}
