import { State } from './../model/state';
import { Country } from './../model/country';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { offset } from '@popperjs/core';
import { of, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardFormService {

  private baseUrl = 'http://localhost:8080/api/countries';

  constructor(private httpClient: HttpClient) { }

  getCreditCardMonths(currentMonth: number): Observable<number[]> {
    let data: number[] = [];
    for (let index = currentMonth; index <= 12; index++) {
      data.push(index);

    }
    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {

    let data: number[] = [];
    const startYear: number = new Date().getFullYear();
    const endYear = startYear + 10;
    for (let index = startYear; index <= endYear; index++) {
      data.push(index);
    }
    return of(data);
  }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(this.baseUrl).pipe();
  }
  getStates(countryCode: string): Observable<State[]> {
    return this.httpClient.get<State[]>(this.baseUrl + "/" + countryCode).pipe(map(response => response['states']));
  }


}
