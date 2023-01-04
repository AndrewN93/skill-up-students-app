import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { toBlob } from 'html-to-image';

@Component({
  selector: 'app-student-country-dougnat-widget',
  templateUrl: './student-country-dougnat-widget.component.html',
  styleUrls: ['./student-country-dougnat-widget.component.scss'],
})
export class StudentCountryDougnatWidgetComponent implements OnInit {
  private actualChart!: Highcharts.Chart;

  @ViewChild('chart', { read: ElementRef, static: true }) chartRef!: ElementRef;

  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text: 'Test test test',
    },

    xAxis: [
      {
        title: {
          text: 'Data',
        },
        alignTicks: false,
      },
      {
        title: {
          text: 'Bell curve',
        },
        alignTicks: false,
        opposite: true,
      },
    ],

    yAxis: [
      {
        title: { text: 'Data' },
      },
      {
        title: { text: 'Test test test' },
        opposite: true,
      },
    ],

    series: [
      // {
      //   name: 'Test test test',
      //   type: 'bellcurve',
      //   xAxis: 1,
      //   yAxis: 1,
      //   baseSeries: 1,
      //   zIndex: -1,
      // },
      {
        name: 'Data',
        type: 'scatter',
        data: [3.5, 3, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3, 3, 4,
          4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3, 3.4, 3.5, 3.4, 3.2,
          3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3,
          3.8, 3.2, 3.7, 3.3, 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2, 3,
          2.2, 2.9, 2.9, 3.1, 3, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3, 2.8, 3,
          2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3, 3.4, 3.1, 2.3, 3, 2.5, 2.6, 3, 2.6, 2.3,
          2.7, 3, 2.9, 2.9, 2.5, 2.8, 3.3, 2.7, 3, 2.9, 3, 3, 2.5, 2.9, 2.5, 3.6,
          3.2, 2.7, 3, 2.5, 2.8, 3.2, 3, 3.8, 2.6, 2.2, 3.2, 2.8, 2.8, 2.7, 3.3, 3.2,
          2.8, 3, 2.8, 3, 2.8, 3.8, 2.8, 2.8, 2.6, 3, 3.4, 3.1, 3, 3.1, 3.1, 3.1, 2.7,
          3.2, 3.3, 3, 2.5, 3, 3.4, 3],
        accessibility: {
          exposeAsGroupOnly: true,
        },
        marker: {
          // radius: 13,
          symbol: 'triangle',
        },
      },
    ],
  };

  ngOnInit(): void {
    if (!this.chartRef) return;
    this.actualChart = Highcharts.chart(
      this.chartRef.nativeElement,
      this.chartOptions
    );
  }

  export() {
    toBlob(this.chartRef.nativeElement).then(function (blob) {
      if (!blob) return;
      const a = document.createElement('a');
      document.body.appendChild(a);
      // a.style = 'display: none';
      const 
        url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'test.png';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
