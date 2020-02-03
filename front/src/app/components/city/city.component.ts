import { Component, OnInit } from '@angular/core';
import {CityService} from '../../services/city-service/city.service';
import {Observable} from 'rxjs';
import {ICity} from '../../interfaces/interface';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  providers: [CityService]
})
export class CityComponent implements OnInit {

  cities: Observable<ICity[]>;

  constructor(
    private cityService: CityService
  ) { }

  ngOnInit() {
    this.getCities();
  }

  getCities(): void {
    this.cities = this.cityService.getCities();
  }
}
