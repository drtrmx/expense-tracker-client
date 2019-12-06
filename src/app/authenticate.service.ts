import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: '',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  isLoggedIn = false;
  user: User;
  redirectUrl: string;

  private usersUrl = environment.baseUrl + 'users';

  constructor(
    private http: HttpClient
  ) { }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const token = btoa(`${username}:${password}`);
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Basic ' + token);
      const user = await this.http.post<User>(`${this.usersUrl}/login`, username, httpOptions).toPromise();
      this.isLoggedIn = true;
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('role', user.role);
      this.user = user;
      return Promise.resolve(true);
    } catch (e) {
      console.log(e);
      return Promise.resolve(false);
    }
  }

  logout() {
    httpOptions.headers = httpOptions.headers.set('Authorization', ``);
    this.isLoggedIn = false;
    this.user = null;
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('role');
  }

}
