import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as Highcharts from 'highcharts';
import hcNoDataToDisplay from 'highcharts/modules/no-data-to-display';
import { Subject, takeUntil } from 'rxjs';
hcNoDataToDisplay(Highcharts);

import { DATE_RANGES_FILTER_DICTIONARY } from 'src/app/constants/date.constants';
import { BaseWidget } from 'src/app/core/components/base-widget/base-widget.component';
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
export class JoinedStudentsWidgetComponent extends BaseWidget implements OnInit, OnDestroy {
  checkInitialized(): void {
    this.store.dispatch(
      studentWidgetActions.checkInitializedWidget({ id: this._id })
    );
  }
  private destroy$ = new Subject<void>();
  private actualChart!: Highcharts.Chart;
  @ViewChild('chart', { read: ElementRef, static: true }) chartRef!: ElementRef;

  selectedPeriod$: any;
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

  constructor(private store: Store) { super() }

  ngOnInit(): void {
    if (!this.chartRef) return;
    this.actualChart = Highcharts.chart(
      this.chartRef.nativeElement,
      this.chartOptions
    );
    this.initChart();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initChart() {
    this.selectedPeriod$ = this.store.select(selectWidgetTimeRange(this._id));
    this.store.dispatch(studentWidgetActions.loadData({ id: this._id }));
    this.initChartSubscriptions();
  }

  initChartSubscriptions() {
    this.selectedPeriod$ = this.store.select(selectWidgetTimeRange(this._id));
    this.store
      .select(selectWidgetLoading(this._id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((payload) => this.toggleOnChartLoading(payload));

    this.store
      .select(selectWidgetData(this._id))
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
      studentWidgetActions.updateConfig({
        config: { timeRange: range },
        id: this._id,
      })
    );
  }
}
