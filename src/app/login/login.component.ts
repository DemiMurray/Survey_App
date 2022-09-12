import { Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { first } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService,
    private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  login(){
    this.authService.login(this.loginForm.controls['email'].value, 
    this.loginForm.controls['password'].value).pipe(first())
    .subscribe(
      (data) => {
        console.log('successful');
        this.openSnackBar('Login Successful!');
        this.router.navigate(['/survey-history']);
      },
      (error) => {
        console.log('unsuccessful');
        this.openSnackBar('Login Unsuccessful!');
        this.router.navigate(['/login']);
      }
    );
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'OK',{
      duration: 5000
    });
  }

}
