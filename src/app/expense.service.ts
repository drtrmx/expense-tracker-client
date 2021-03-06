import { Injectable } from '@angular/core';
import { Expense } from './expense';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpOptions } from './authenticate.service';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private expenseUrl = environment.baseUrl + 'transactions';

  constructor(private http: HttpClient) {
    const token = window.localStorage.getItem('token');
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Basic ' + token);
  }

  getExpenses(): Promise<Expense[]> {
    return this.http.get<Expense[]>(
      this.expenseUrl,
      httpOptions
    ).toPromise();
  }

  getExpense(id: number): Promise<Expense> {
    return this.http.get<Expense>(
      `${this.expenseUrl}/${id}`,
      httpOptions
    ).toPromise();
  }

  modifyExpense(id: number, expense: Expense): Promise<Expense> {
    return this.http.put<Expense>(
      `${this.expenseUrl}/${id}`,
      expense,
      httpOptions
    ).toPromise();
  }

  addExpense(expense: Expense): Promise<Expense> {
    return this.http.post<Expense>(
      this.expenseUrl,
      expense,
      httpOptions
    ).toPromise();
  }

  updateExpense(id: number, expense: Expense): Promise<Expense> {
    return this.http.put<Expense>(
      `${this.expenseUrl}/${id}`,
      expense,
      httpOptions
    ).toPromise();
  }

  deleteExpense(id: number): Promise<void> {
    return this.http.delete<void>(
      `${this.expenseUrl}/${id}`,
      httpOptions
    ).toPromise();
  }
}
