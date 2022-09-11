import { Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey-questions',
  templateUrl: './survey-questions.component.html',
  styleUrls: ['./survey-questions.component.scss']
})
export class SurveyQuestionsComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { }
  currentUser: any;
  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
