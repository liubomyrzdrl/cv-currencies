import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency } from './currencies.component';
import { Observable, from } from 'rxjs';
import {  map, scan, concatMap } from 'rxjs/operators';


@Injectable()
export class CurrenciesService {

  start_url: string =
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json';
  dateChart_url: string =
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?';

  constructor(private http: HttpClient) {}

  getCurrenciesBeginValues(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.start_url);
  }

  getCurrenciesValues( currency: string, date: string): Observable<Currency[]> {
    let url = `${this.dateChart_url}valcode=${currency}&date=${date}&json`;
    return this.http.get<Currency[]>(url);
  }

  handleFetchCurrenciesData(range: Array<string>, currency: string): Observable<Currency[]> {
   return from(range)
      .pipe(
        concatMap(item => {
          return this.getCurrenciesValues(currency, item);
        }),
        map(
          (data: any) =>
            data.map((item: any) => {
              return {
                rate: item.rate,
                exchangedate: item.exchangedate,
              };
            }),
        ),
        scan((acc: Array<Currency>, item: Array<Currency>) => {
          return [...acc, ...item];
        }, [])
      )
  }
}
