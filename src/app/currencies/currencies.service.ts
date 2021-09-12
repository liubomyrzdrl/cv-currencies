import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency } from './currencies.component';
import { Observable, range } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { concatMap, map, scan } from 'rxjs/operators';

@Injectable()
export class CurrenciesService {
  currency: string = '';
  startDate: string | any = '';
  endDate: string | any = '';

  fetchedCurrencies: any = [];

  chart: any;

  range: any;

  start_url: string =
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json';
  dateChart_url: string =
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?';

  constructor(private http: HttpClient) {}

  getCurrenciesBeginValues(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.start_url);
  }

  getCurrenciesValue(num: number): Observable<Currency[]> {
    let url = `${this.dateChart_url}valcode=${this.currency}&date=${String(
      +this.startDate + num
    )}&json`;
    return this.http.get<Currency[]>(url);
  }

  handleFetchCurrencies(): Observable<Currency[]> {
   return this.range
      .pipe(
        concatMap((num: number) => {
          return this.getCurrenciesValue(num);
        }),
        map(
          (data: any[]) =>
            data.map((item) => {
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
      .subscribe(
        (data: any) => (this.fetchedCurrencies = data),
        (err: Error) => console.log(err),
        () => this.getChart()
      );
  }

  setChoozenCurrrency({ value }: MatSelectChange) {
    this.currency = value;
  }

  setStartDateValue({ value }: any) {
    let date = new Date(value);
    let yyyy = date.getFullYear().toString();
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let dd = date.getDate().toString();
    this.startDate = `${yyyy}${mm}${dd}`;
  }

  setEndDateValue({ value }: any) {
    let date = new Date(value);
    let yyyy = date.getFullYear().toString();
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let dd = date.getDate().toString();
    this.endDate = `${yyyy}${mm}${dd}`;
  }

  setChart() {
    this.range = range(0, (this.endDate - this.startDate) + 1);
    this.handleFetchCurrencies();
  }

  setTable() {
    this.range = range(0, (this.endDate - this.startDate) + 1);
    this.handleFetchCurrencies();
    console.log('Table');
  }

  getChart() {
    let rate = this.fetchedCurrencies.map((item: any) => item.rate);
    let exchangedate = this.fetchedCurrencies.map((item: any) => item.exchangedate);
    this.chart = {
      legend: {
        data: [`UAH to ${this.currency}`],
        align: 'left',
      },

      tooltip: {},
      xAxis: {

        align: 'right',
        position: 'left',
        type: 'category',
        data: exchangedate,
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        name: 'UAN',
        position: 'center',
      },
      series: [
        {
          label:{
            show:true,
            position:'bottom',
          },

          name: `UAH to ${this.currency}`,
          data: rate,
          type: 'line',
        },
      ],
    };
  }
}
