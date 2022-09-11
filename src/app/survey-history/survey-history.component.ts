import { Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey-history',
  templateUrl: './survey-history.component.html',
  styleUrls: ['./survey-history.component.scss']
})
export class SurveyHistoryComponent implements OnInit {
  currentUser: any;
  constructor(private authService:AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
