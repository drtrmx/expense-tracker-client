import { Injectable } from '@angular/core';
import { Place } from './place';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpOptions } from './authenticate.service';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private placeUrl = environment.baseUrl + 'places';

  constructor(private http: HttpClient) {
    const token = window.localStorage.getItem('token');
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Basic ' + token);
  }

  getPlaces(): Promise<Place[]> {
    return this.http.get<Place[]>(
      this.placeUrl,
      httpOptions
    ).toPromise();
  }

  getPlace(id: number): Promise<Place> {
    return this.http.get<Place>(
      `${this.placeUrl}/${id}`,
      httpOptions
    ).toPromise();
  }

  modifyPlace(id: number, place: Place): Promise<Place> {
    return this.http.put<Place>(
      `${this.placeUrl}/${id}`,
      place,
      httpOptions
    ).toPromise();
  }

  addPlace(place: Place): Promise<Place> {
    return this.http.post<Place>(
      this.placeUrl,
      place,
      httpOptions
    ).toPromise();
  }

  updatePlace(id: number, place: Place): Promise<Place> {
    return this.http.put<Place>(
      `${this.placeUrl}/${id}`,
      place,
      httpOptions
    ).toPromise();
  }

  deletePlace(id: number): Promise<void> {
    return this.http.delete<void>(
      `${this.placeUrl}/${id}`,
      httpOptions
    ).toPromise();
  }
}
