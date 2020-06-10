import { Component, OnInit } from '@angular/core';
import { ChartServiceService } from './chart-service.service';

@Component({
  selector: 'app-chart-dashboard',
  templateUrl: './chart-dashboard.component.html',
  styleUrls: ['./chart-dashboard.component.css']
})
export class ChartDashboardComponent implements OnInit {

  constructor(private chartService: ChartServiceService) { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left'
        },
        {
          id: 'y-axis-1',
          position: 'right'
        }
      ]
    }
  };

  public barChartLabels = [];
  public barChartType = 'line';
  public barChartLegend = true;

  public barChartData = [
    { data: [], label: 'Confirmed' },
    { data: [], label: 'Active', yAxisID: 'y-axis-1' }
  ];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.chartService.getApiData().subscribe((res) => {
      this.pushDataToChart(res);
    });
  }

  pushDataToChart(res) {
    let data = res.cases_time_series;
    let sumofActiveDeceased = 0;
    for (let i = 0; i < data.length; i++) {
      this.barChartLabels.push(data[i].date);
      this.barChartData[0].data.push(data[i].dailyconfirmed);
      
      sumofActiveDeceased = +data[i].totaldeceased + (+data[i].totalrecovered);
      this.barChartData[1].data.push(+data[i].totalconfirmed - sumofActiveDeceased);
    }
  }

}
