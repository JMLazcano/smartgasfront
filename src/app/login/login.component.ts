/*import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private _http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.initForm();
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    });
    
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl(['',[Validators.required, Validators.email]]),
      password: new FormControl(['',[Validators.required]]),
    })
  }

  loginProcess() {
    //if(this.formGroup.valid){
      this._http.get<any>("http://localhost:4200/login").subscribe(res=>{
        const user = res.find((a:any)=>{
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        })
        if(user){
          this.formGroup.reset();
          this.loginForm.reset();
          this.router.navigate(['main']);
        }else{
          alert('User not found');
        }
      },err=>{
        alert(err);
      })

      /*this.auth_service.login(this.formGroup.value).subscribe(result=>{
        if(result.success){
          console.log(result);
          alert(result.message);
        }else{
          alert(result.message);
        }
      })*/
    //}
//  }

//}

import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from 'src/app/common/services/login.service';
import { SessionService } from 'src/app/common/services/session.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(private router: Router, public loginService: LoginService,
              private sessionService: SessionService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl("",[Validators.required, Validators.email]),
      password: new FormControl("",[Validators.required]),
    })
  }

  /*googleLogin(): void {
    this.loginService.tryGoogleLogin();
  }*/

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  login(): void {
    if(this.formGroup.valid){
      this.loginService.attemptLogin(this.formGroup.value.email, this.formGroup.value.password)
        .then(user => {
          user = JSON.parse(user);
          localStorage.setItem('ma-token', user.token);
          this.sessionService.setUsername(user.user);
          
          this.sessionService.setLoginState(true);

          console.log('document admin status:', user.adminStatus)
          this.sessionService.setAdminState(user.adminStatus);


          console.log('token:', user.token, ';');
          console.log(this.sessionService.getSessionData())

          this.goToPage('/userpage');
          console.log('Login successful');
          this.formGroup.reset();
        })
        .catch(err => {
          if (err.status === 404) {
            console.log('Email or password is incorrect');
          }
          this.formGroup.reset();
        });
      }else{
        console.log('Something went wrong');
        this.formGroup.reset();
      }
    }

  }

