import { computed, inject, Injectable, signal } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { User } from '../interfaces/user.interfaces';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { LoginResponse } from '../interfaces/login-response.interfaces';

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

}
