import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  constructor(private http: HttpClient) {}

  getSurveys() {
    return this.http.get<any>(`${environment.baseUrl}Survey`);
  }

  getSurveyQuestions() {
    return this.http.get<any>(`${environment.baseUrl}Question`);
  }

  createSurvey(_answers: any) {
    console.log(_answers);
    return this.http.post(`${environment.baseUrl}Survey`, {
      answers: {
        isGymMembership: _answers[0],
        name: _answers[1],
        gymClasses: _answers[2],
        fitnessLevel: _answers[3],
        email: _answers[4]
      }
    });
  }
}
