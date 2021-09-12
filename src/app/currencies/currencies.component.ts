import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { CurrenciesService } from './currencies.service';
import { MatSelectChange } from '@angular/material/select';
import { FormControl, FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';

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

  switchTable: boolean | any;
  switchChart:  boolean | any;
  displayedColumns: string[] = ['exchangedate', 'rate' ];

  constructor(public currenciesService: CurrenciesService)  { }

  ngOnInit(): void {
      this.currenciesService.getCurrenciesBeginValues()
          .subscribe(data => this.currencies = data)
      //this.currenciesService.getChart()
  }

  handleSwitchTable() {
   this.switchTable = true;
   this.switchChart = false;
  }

  handleSwitchChart() {
    this.switchTable = false;
    this.switchChart = true;
  }

}
