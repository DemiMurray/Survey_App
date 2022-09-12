import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from './../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  register(){
      this.authService.register(this.registerForm.value).pipe(first())
      .subscribe(
        (data) => {
          console.log('successful');
          this.openSnackBar('Registration Successful!');
          this.router.navigate(['/survey-history']);
        },
        (error) => {
          console.log('unsuccessful');
          this.openSnackBar('Registration Unsuccessful!');
          this.router.navigate(['/register']);
        }
      );
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'OK',{
      duration: 5000
    });
  }

}
