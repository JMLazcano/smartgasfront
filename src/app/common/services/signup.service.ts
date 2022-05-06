import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  attemptSignup(user: any): Promise<any> {
    const url = environment.apiUrl + "/signup";
    const body = {
      email: user.email,
      password: user.password,
      confirmation: user.confirmation
    }
    return this.http.post(url, body, { responseType: 'text' }).toPromise();
  }

  /*tryGoogleLogin(): void {
    window.location.href = "//ma-back.herokuapp.com/api/auth/google?signup=true";
  }*/
} 