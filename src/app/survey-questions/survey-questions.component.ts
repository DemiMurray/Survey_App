import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SurveyService } from './../services/survey.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-survey-questions',
  templateUrl: './survey-questions.component.html',
  styleUrls: ['./survey-questions.component.scss']
})
export class SurveyQuestionsComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router,
    private surveyService: SurveyService, private snackBar: MatSnackBar) { }

  currentUser: any;
  questions: any = [{ text: ''}];
  index: number = 1;
  input: any;
  inputReceived: boolean = false;
  answerList: any[] = [];
  multiAnswer: string[] = [];
  answer: any = null;

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;

    this.surveyService.getSurveyQuestions().subscribe(
      (data) => {
        this.questions = data;
        console.log(data);
        console.log('successfully loaded questions');
      },
      (error) => {
        console.log('unsuccessfully loaded questions');
      }
      
    );
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  changeInput(event: any){
    this.inputReceived = true;
    console.log(this.answer);
    if(this.answer == ''){
      this.inputReceived = false;
    }
    else{
      this.inputReceived = true;
    }
  }

  changeMultiInput(event: any){
    this.inputReceived = true;
    if(this.multiAnswer.includes(event.source.value)){
      this.multiAnswer = this.multiAnswer.filter(obj => {
        return obj !== event.source.value});
    }
    else{
      this.multiAnswer.push(event.source.value);
    }
  }

  nextQuestion(){
    this.index++;
    if(this.index == 4){
      this.answerList.push(this.multiAnswer);
    }
    else{
      this.answerList.push(this.answer);
    }
    this.answer = null;
    this.multiAnswer = [];
    console.log(this.answerList);
    this.inputReceived = false;
  }

  submit(){
    this.answerList.push(this.answer);
    console.log(this.answerList);

    this.surveyService.createSurvey(this.answerList).toPromise()
    .then((data: any) => {
      console.log(data);
      this.openSnackBar('Survey successful!');
      this.router.navigate(['/survey-history']);
    })
    .catch((err: any) => {
      console.log(err);
      this.openSnackBar('Survey unsuccessful!');
      // s
    });
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'OK',{
      duration: 5000
    });
  }
}
