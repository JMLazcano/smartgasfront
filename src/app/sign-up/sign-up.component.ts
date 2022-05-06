import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SignupService } from 'src/app/common/services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignupComponent implements OnInit {
  
  formGroup!: FormGroup;
  form!: FormGroup;
  reactiveForm!: FormGroup;
  submitted: boolean = false;

  constructor(private signupService: SignupService, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmation: new FormControl('', [Validators.required]),
    });
  }
 
  ngOnInit(): void {

  }


  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  signup(): void {
    let user = {
      email: this.formGroup.value.email,
      password: this.formGroup.value.password
    }
    this.signupService.attemptSignup(user)
      .then(response => {
        this.goToPage('userpage');
      })
      .catch(err => {
        console.log(err)
      })
  }

  /*googleSignup() {
    this.signupService.tryGoogleLogin();
  }*/
}
