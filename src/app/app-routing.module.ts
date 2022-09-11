import { SurveyHistoryComponent } from './survey-history/survey-history.component';
import { SurveyQuestionsComponent } from './survey-questions/survey-questions.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'survey-questions',
    component: SurveyQuestionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'survey-history',
    component: SurveyHistoryComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
