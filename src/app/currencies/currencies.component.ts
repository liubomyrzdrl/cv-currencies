import { Component, OnInit } from '@angular/core';
import { CurrenciesService } from './currencies.service';
import { MatSelectChange } from '@angular/material/select';
import { FormControl } from '@angular/forms';
import { LoaderService } from '../loader/loader.service';

export interface Currency {
     r030: string,
     txt: string,
     rate: number,
     cc: string,
     exchangedate: string
}

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit {
  currencies: Currency[] = [];
  start = new FormControl();
  end = new FormControl();

  currency: string = '';
  startDate: string | any = '';
  endDate: string | any = '';

  fetchedCurrencies: any = [];
  chart: any;
  currencyRange: any;

  switchTable: boolean | any;
  switchChart:  boolean | any;
  displayedColumns: string[] = ['exchangedate', 'rate'];

  constructor(
    private currenciesService: CurrenciesService,
    public loaderService: LoaderService
  )  {}

  ngOnInit(): void {
      this.currenciesService.getCurrenciesBeginValues()
        .subscribe(data => this.currencies = data)
  }

  handleSwitchTable() {
   this.switchTable = true;
   this.switchChart = false;
  }

  handleSwitchChart() {
    this.switchTable = false;
    this.switchChart = true;
  }

  setChoozenCurrrency({ value }: MatSelectChange) {
    this.currency = value;
  }

  setStartDateValue({ value }: any) {
    this.startDate = value;
  }

  setEndDateValue({ value }: any) {
    this.endDate = value;
  }

  dateRange(startDate: any, endDate: any, steps = 1) {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      let currentDateValue = new Date(currentDate)
      let yyyy = currentDateValue.getFullYear().toString();
      let mm = String(currentDateValue.getMonth() + 1).padStart(2, '0');
      let dd = String(currentDateValue.getDate()).padStart(2, '0');
      dateArray.push(`${yyyy}${mm}${dd}`);
      currentDate.setUTCDate(currentDate.getUTCDate() + steps);
  }
    return dateArray;
  }

  setChart() {
    let currRange = this.dateRange(this.startDate, this.endDate);
    this.currenciesService.handleFetchCurrenciesData(currRange, this.currency)
    .subscribe(
      (data: any) => (this.fetchedCurrencies = data),
      (err: Error) => console.log(err),
      () => this.buildChart()
    );
  }

  setTable() {
    let currRange = this.dateRange(this.startDate, this.endDate);
    this.currenciesService.handleFetchCurrenciesData(currRange, this.currency)
    .subscribe(
      (data: any) => (this.fetchedCurrencies = data),
      (err: Error) => console.log(err),
      () => this.buildChart()
    );
  }

  buildChart() {
    let rate = this.fetchedCurrencies.map((item: any) => item.rate);
    let exchangedate = this.fetchedCurrencies.map((item: any) => item.exchangedate);
    let forChartsArray = rate.sort();
    let fixedNumber = Number((forChartsArray[forChartsArray.length - 1] - forChartsArray[0]).toFixed(2)) / 3;
    let min =  (forChartsArray[0] - fixedNumber).toFixed(2);
    let max = forChartsArray[forChartsArray - 1];

    this.chart = {
      legend: {
        data: [`UAH to ${this.currency}`],
        align: 'left',
        x: 'center',
        y: 'bottom',

      },
      title: {
        text: `${this.currency} rates to UAH  `,
        subtext: 'Source: National bank of Ukraine',
        x: 'center'
      },
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
        min,
        max,

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
