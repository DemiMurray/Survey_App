import { SurveyService } from './../services/survey.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-survey-history',
  templateUrl: './survey-history.component.html',
  styleUrls: ['./survey-history.component.scss'],
})
export class SurveyHistoryComponent implements OnInit {
  currentUser: any;
  surveys: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private surveyService: SurveyService
  ) {}
  createdDate: string = '';
  createTime: string = '';

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;

    this.surveyService.getSurveys().subscribe(
      (data) => {
        this.surveys = data;
        console.log(data);
        console.log('successfully loaded surveys');
      },
      (error) => {
        console.log('unsuccessfully loaded surveys');
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  downloadFiles(data: any) {
    const replacer = (_key: any, value: null) => (value === null ? '' : value); // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map((row: { [x: string]: any }) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var a = document.createElement('a');
    var blob = new Blob([csvArray], { type: 'text/csv' }),
      url = window.URL.createObjectURL(blob);

    a.href = url;

    const current = new Date();
    current.setHours(0);
    current.setMinutes(0);
    current.setSeconds(0);
    current.setMilliseconds(0);
    const timestamp = current.getTime();

    a.download = 'GYM_SURVEY_' + timestamp.toString() + '.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
