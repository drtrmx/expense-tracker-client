import { Injectable } from '@angular/core';
import { Category } from './category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpOptions } from './authenticate.service';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl = environment.baseUrl + 'categories';

  constructor(private http: HttpClient) {
    const token = window.localStorage.getItem('token');
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Basic ' + token);
  }

  getCategories(): Promise<Category[]> {
    return this.http.get<Category[]>(
      this.categoryUrl,
      httpOptions
    ).toPromise();
  }

  getCategory(id: number): Promise<Category> {
    return this.http.get<Category>(
      `${this.categoryUrl}/${id}`,
      httpOptions
    ).toPromise();
  }

  modifyCategory(id: number, category: Category): Promise<Category> {
    return this.http.put<Category>(
      `${this.categoryUrl}/${id}`,
      category,
      httpOptions
    ).toPromise();
  }

  addCategory(category: Category): Promise<Category> {
    return this.http.post<Category>(
      this.categoryUrl,
      category,
      httpOptions
    ).toPromise();
  }

  updateCategory(id: number, category: Category): Promise<Category> {
    return this.http.put<Category>(
      `${this.categoryUrl}/${id}`,
      category,
      httpOptions
    ).toPromise();
  }

  deleteCategory(id: number): Promise<void> {
    return this.http.delete<void>(
      `${this.categoryUrl}/${id}`,
      httpOptions
    ).toPromise();
  }
}
