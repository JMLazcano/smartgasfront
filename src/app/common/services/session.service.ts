import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  username: string = '';

  constructor(private http: HttpClient) {
    
  }

  getUsername(): string {
    return this.username;
  }

  setUsername(username: string) {
    this.username = username;
  }

  setAdminState(state: boolean): void {
    if (state) {
      console.log('is an Admin');
    }
    
    this.isAdmin = state;
  }

  setToken(): void {
    const url = environment.apiUrl + "/auth/token";

    this.http.get(url, { responseType: 'text' }).toPromise()
      .then(response => {
        localStorage.setItem('ma-token', response || '');
      })
      .catch(err => {
        console.log('Something went wrong');
      })
  }

  setLoginState(state: boolean): void {
    this.isLoggedIn = state;
  }

  getLoginState(): boolean {
    return this.isLoggedIn;
  }

  getSessionData(): any {
    return {  
      user: this.username,
      loginStatus: this.isLoggedIn,
      adminStatus: this.isAdmin
    }
  }
}