import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpOptions } from "./authenticate.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/users';

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Promise<User[]> {
    return this.http.get<User[]>(
      this.userUrl,
      httpOptions
    ).toPromise();
  }


  getUser(id: number): Promise<User> {
    return this.http.get<User>(
      `${this.userUrl}/${id}`,
      httpOptions
    ).toPromise();
  }


  modifyUser(id: number, user: User): Promise<User> {
    return this.http.put<User>(
      `${this.userUrl}/${id}`,
      user,
      httpOptions
    ).toPromise();
  }

  addUser(user: User): Promise<User> {
    return this.http.post<User>(
      this.userUrl,
      user,
      httpOptions
    ).toPromise();
  }
}