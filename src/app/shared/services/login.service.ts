import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, pipe, tap, throwError } from 'rxjs';
import { User } from '../model/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginRequest } from '../model/loginRequest.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  currentUserLoginOn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData:BehaviorSubject<User> = new BehaviorSubject<User>({email:''})
  
  private baseURL = 'http://localhost:8080/users';

  constructor(private httpClient:HttpClient) { }

  login(credentials:LoginRequest):Observable<User>{
    return this.httpClient.post<User>(this.baseURL+'/login',credentials).pipe(
      tap((userData:User) => {
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    if(error.status === 0){
      console.log('Se ha producido un error')
    }else{
      console.log('Backend retorno el codigo de estado ',error.status,error.error);
    }
    return throwError(() => new Error('algo fallo, por favor intentelo nuevamente'))
  }

  get userData():Observable<User>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }
}
