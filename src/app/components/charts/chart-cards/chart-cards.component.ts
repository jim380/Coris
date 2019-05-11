import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-cards',
  templateUrl: './chart-cards.component.html',
  styleUrls: ['./chart-cards.component.scss']
})
export class ChartCardsComponent implements OnInit {
  public map: any = { lat: 51.678418, lng: 7.809007 };

  public chart3Type = 'line';
  public chart2Type = 'bar';
  public chart1Type = 'radar';

  public chart1Datasets: Array<any> = [65, 59, 40, 87];

  public chart2Datasets: Array<any> = [
    {
      data: [65, 59, 80, 90],
      labels: ['January', 'Febuary', 'March', 'April'],
      label: '#1'
    },
  ];

  public chart3Datasets: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: '#1'},
    {data: [28, 48, 10, 69, 36, 37, 110], label: '#2'},
    {data: [38, 58, 30, 79, 26, 37, 20], label: '#3'},
    {data: [48, 68, 20, 89, 76, 27, 40], label: '#4'}
  ];

  public chartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr'];

  public chart1Colors: Array<any> = [
    {
      backgroundColor: ['#4285F4', '#ffbb33', '#29b6f6', '#FF5252'],
      hoverBackgroundColor: ['#6ea0f2', '#fec451', '#52c3f6', '#fa6e6e']
    }
  ];
  public chart2Colors: Array<any> = [
    {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderColor: 'rgba(255,255,255,1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255,255,255,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,255,255,1)'
    }
  ];
  public chart3Colors: Array<any> = [
    {
        backgroundColor: 'rgba(220,220,220,0.2)',
        borderColor: 'rgba(220,220,220,1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(220,220,220,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(220,220,220,1)'
    }
  ];

  public chart1Options: any = {
    responsive: true,
    legend: {
      labels: {
        fontColor: 'white',
      }
    }
  };

  public chart2Options: any = {
    responsive: true,
    legend: {
      labels: {
        fontColor: 'white',
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: 'white',
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: 'white',
        }
      }]
    }
  };

  constructor() {
  }

  ngOnInit() {
  }
}
