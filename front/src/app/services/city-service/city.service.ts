import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICity} from '../../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  url = 'http://localhost:5000/api/cities';

  constructor(
    private http: HttpClient
  ) { }

  getCities(): Observable<ICity[]> {
    return this.http.get<ICity[]>(this.url);
  }
}
