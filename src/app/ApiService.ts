import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from './Person';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyApiService {
  constructor(private http: HttpClient) {}

  getData(): Observable<Person[]> {
    return this.http.get<Person[]>('http://localhost:7080/weatherforecast')
  }

  updateData(data: any) {
    return this.http.post('http://localhost:7080/weatherforecast', data);
  }
}
