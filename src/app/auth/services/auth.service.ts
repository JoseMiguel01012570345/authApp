import { inject, Injectable, signal } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user.interfaces';
import { AuthStatus } from '../interfaces/auth-status.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl : string = environments.baseURL
  private http = inject( HttpClient )

  private _currentUser = signal<User | null>(null)
  private _authStatus = signal<AuthStatus>(AuthStatus.checking)

  constructor() { }

  login( email:string , password:string ):Observable<boolean>{
    
    return of(true)
  }

}
