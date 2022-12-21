import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Highcharts from 'highcharts';
import hcNoDataToDisplay from 'highcharts/modules/no-data-to-display';
import { Subject, takeUntil } from 'rxjs';
hcNoDataToDisplay(Highcharts);

import { DATE_RANGES_FILTER_DICTIONARY } from 'src/app/constants/date.constants';
import { PartialDateTimeUnit } from 'src/app/types/date.types';
import { StudentsWidgetData } from '../joined-students-widget.types';
import { studentWidgetActions } from '../state/joined-students-widget.actions';
import {
  selectWidgetData,
  selectWidgetLoading,
  selectWidgetTimeRange,
} from '../state/joined-students-widget.selectors';

@Component({
  selector: 'app-joined-students-widget',
  templateUrl: './joined-students-widget.component.html',
  styleUrls: ['./joined-students-widget.component.scss'],
})
export class JoinedStudentsWidgetComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  private actualChart!: Highcharts.Chart;
  @ViewChild('chart', { read: ElementRef, static: true }) set chartContainer(
    el: ElementRef
  ) {
    if (!el) return;
    this.actualChart = Highcharts.chart(el.nativeElement, this.chartOptions);
    this.initChart();
  }
  selectedPeriod$ = this.store.select(selectWidgetTimeRange);
  periods = Object.entries(DATE_RANGES_FILTER_DICTIONARY);

  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    lang: {
      loading: 'Loading... Please wait.',
    },
    loading: {
      style: {
        backgroundColor: '#424242',
      },
    },
    chart: {
      type: 'column',
    },
    title: {
      text: '',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Students amount',
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: 'Students joined',
        type: 'line',
        data: [],
      },
    ],
  };

  constructor(private store: Store) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  initChart() {
    this.store.dispatch(studentWidgetActions.loadData());
    this.initChartSubscriptions();
  }
  initChartSubscriptions() {
    this.store
      .select(selectWidgetLoading)
      .pipe(takeUntil(this.destroy$))
      .subscribe((payload) => this.toggleOnChartLoading(payload));

    this.store
      .select(selectWidgetData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((payload) => this.updateChartData(payload));
  }
  toggleOnChartLoading(loading: boolean) {
    loading && this.actualChart
      ? this.actualChart.showLoading()
      : this.actualChart.hideLoading();

    this.actualChart.reflow();
  }

  updateChartData(data: StudentsWidgetData[]) {
    this.actualChart.series[0].update({
      name: 'Students joined',
      type: 'bar',
      data,
    });
    this.actualChart.reflow();
  }

  selectPeriod(range: PartialDateTimeUnit) {
    this.store.dispatch(
      studentWidgetActions.updateConfig({ config: { timeRange: range } })
    );
  }
}
