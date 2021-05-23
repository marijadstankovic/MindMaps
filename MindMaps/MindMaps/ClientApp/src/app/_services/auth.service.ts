import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = "https://localhost:5001/api/auth/";
  private currentUserSource = new ReplaySubject<any>(1);
  currentUser$ = this.currentUserSource.asObservable();
  jwtHelper = new JwtHelperService();
  decodedToken: any;


  constructor(private http: HttpClient) { }

  login(model: any)
  {
    return this.http.post(this.baseUrl + 'login', model)
    .pipe(
      map((response: any) => {
        const user = response;
        if(user){
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          localStorage.setItem('user', JSON.stringify(this.decodedToken));
          console.log(this.decodedToken);
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(model: any){
    return this.http.post(this.baseUrl + 'register', model);
    // .pipe(
    //   map((response: any) => {
    //     const user = response;
    //     if(user){
    //       localStorage.setItem('token', user.token);
    //     }
    //   })
    // )
  }

  loggedin()
  {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }

}
