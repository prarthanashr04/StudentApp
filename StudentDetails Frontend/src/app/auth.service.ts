import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDataType } from './detail-data-types';
import { shareReplay, tap } from 'rxjs/operators';
import { Router } from "@angular/router";  
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = "http://localhost:3000/login";


  constructor(private http: HttpClient, private router: Router) { }

  login(email_id: string, password: string) {
    console.log(email_id,password);
    return this.http.post<LoginDataType>(this.loginUrl, { email_id, password })
      .pipe(tap(_ => this.setSession(_)), shareReplay());
    
    
  }

  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    console.log(localStorage);
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.router.navigate(['/login']); 
    
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse("expiration");
    return moment(expiresAt);
  }
}
