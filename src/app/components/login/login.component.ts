import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    ) { }

  loginForm: FormGroup = this.fb.group({
    login: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
    if(localStorage.getItem('auth')) {
      this.router.navigate(['/news']);
    }
  }

  Login() {
    if(this.loginForm.controls['login'].value == 'Admin' 
    && this.loginForm.controls['password'].value == '12345') {
      localStorage.setItem('auth', 'true');
      this.router.navigate(['/news']);
    } else {
      this.loginForm.setErrors({'incorrect': true});
    }
  }

}
