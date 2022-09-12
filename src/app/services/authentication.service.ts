import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: any;
  public currentUser: any;
  public logged: any;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(_email: string, _password: string) {
    return this.http
      .post<any>(`${environment.baseUrl}User/authenticate`, {
        email: _email,
        password: _password,
      })
      .pipe(
        map((user) => {
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  register(userData: any) {
    return this.http
      .post<any>(`${environment.baseUrl}User`, userData)
      .pipe(
        map((user) => {
          this.login(user.email, user.password);
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser() {
    let user = localStorage.getItem('currentUser');
    return user;
  }
}
