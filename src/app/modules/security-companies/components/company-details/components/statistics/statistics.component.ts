import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis } from 'ng-apexcharts';
import { ReportsService } from 'src/app/modules/accident/service/reports.service';
import { CompaniesService } from 'src/app/modules/security-companies/services/companies.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  responsive: ApexResponsive[];
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend |undefined;
  colors: any[]| undefined;
};

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})

export class StatisticsComponent implements OnInit {
   id:any;
   statistic!: any;
  flag!: boolean
  public chartOptions!: Partial<ChartOptions>;
  totalHoure!: string;
  totalWorkHoure!: number;
  totalBrackHoure!: number;
  totalExstraTime!: number;

  constructor(private _companies:CompaniesService , private translate: TranslateService ,private route: ActivatedRoute) {


  }
  ngOnInit(): void {
    this.id=this.route.parent?.snapshot.params['id']
      console.log(this.id);
    let data: any
    var dateToday = new Date()
    var lastDate = dateToday.getMonth() + 1 + '-' + dateToday.getDate() + '-' + dateToday.getFullYear()
    var newDate = new Date(dateToday.setMonth(dateToday.getMonth() - 1));
    var firstDate = newDate.getMonth() + 1 + '-' + newDate.getDate() + '-' + newDate.getFullYear()
    // this._reports.clientId.subscribe((res1) => {
    //   if (res1) {
      this.getStatistic(this.id , firstDate , lastDate)
        this._companies.GetAttendanceStatsticLocationAndDayByCompanyId(this.id, firstDate, lastDate).subscribe((res) => {
          this.flag = true
          // this._reports.statisticData.subscribe((Response) => {
          //   if (Response) {
          //     data = Response
          //     this.getData(data)
          //   } else {
            console.log(res);
            
              data = res
              this.getData(data)
            });
          

       // });
    //   } else {
    //     this._reports.getALlData(firstDate, lastDate, Loader.yes).subscribe((res) => {
    //       this.flag = true
    //       data = res
    //       this.getData(data)
    //     });
    //   }
    // })

  }
  convertTimeToFload(time: string) {
    let hour = time.split(':')[0]
    let minute = time.split(':')[1]
    let convert = Number(minute) / 60
    return hour + '.' + convert.toFixed(2).split('.')[1]
  }
  getData(data: any) {
    let hours = ''
    let totalHours = ''
    let workHours = ''
    let breakHours = ''
    let overTimeHours = ''
    this.translate.get('hours').subscribe((res) => {
      hours = res
    })
    this.translate.get('security_dashboard.dash.totalHours').subscribe((res) => {
      totalHours = res
    })
    this.translate.get('security_dashboard.dash.workHours').subscribe((res) => {
      workHours = res
    })
    this.translate.get('security_dashboard.dash.breakHours').subscribe((res) => {
      breakHours = res
    })
    this.translate.get('security_dashboard.dash.overTimeHours').subscribe((res) => {
      overTimeHours = res
    })
    var date: any[] = []
    var totalHoure: any[] = []
    var totalWorkHoure: any[] = []
    var totalBrackHoure: any[] = []
    var totalExstraTime: any[] = []
    var i = 0
    data.forEach((element: any) => {
      console.log(element);
      
      let dateSplit = element.date.split(' ')[0]
      var day = dateSplit.split('-')[0]
      var month = dateSplit.split('-')[1]
      var year = dateSplit.split('-')[2]
      data[i].date = new Date(month + '-' + day + '-' + year)
      i++
    });
    data.sort((a: any, b: any) => a.date - b.date)
    data.forEach((element: any) => {
      totalHoure.push(this.convertTimeToFload(element.attendanceTimeStatistic.totalHoure.substring(0, 8)))
      totalWorkHoure.push(this.convertTimeToFload(element.attendanceTimeStatistic.totalWorkHoure.substring(0, 8)))
      totalBrackHoure.push(this.convertTimeToFload(element.attendanceTimeStatistic.totalBrackHoure.substring(0, 8)))
      totalExstraTime.push(this.convertTimeToFload(element.attendanceTimeStatistic.totalExstraTime.substring(0, 8)))
      let dateSplit = new Date(element.date).toDateString()
      date.push(dateSplit)
    })
    this.chartOptions = {

      colors: ['#F36E32', '#CECECE', '#8D8DFF'],
      series: [
        {
          name: `${workHours}`,
          data: totalWorkHoure
        },
        {
          name: `${breakHours}`,
          data: totalBrackHoure
        },
        {
          name: `${overTimeHours}`,
          data: totalExstraTime
        }
      ],
      chart: {

        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "20%",
          //endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        labels: {
          rotate: 50
        },
        categories:
          date
      },
      yaxis: {

        title: {
          text: `${hours}`,
          offsetX: -25,
          offsetY: 0,
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#263238'
          }
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + `${hours}`;
          }
        }
      }
    };
  }

  getStatistic(companyID:number ,date1: string, date2: string) {
    this._companies
      .GetAttendanceStatsticByCompanyId(companyID , date1 , date2 )
      .subscribe((res) => {
        if (res) {
          this.statistic = res;
          this.totalWorkHoure = this.statistic.totalWorkHoure.substring(0, 5);
          this.totalBrackHoure = this.statistic.totalBrackHoure.substring(0, 5);
          this.totalExstraTime = this.statistic.totalExstraTime.substring(0, 5);
          let h =
            Number(this.totalWorkHoure.toString().split(':')[0]) +
            Number(this.totalExstraTime.toString().split(':')[0]);
          let m =
            Number(this.totalWorkHoure.toString().split(':')[1]) +
            Number(this.totalExstraTime.toString().split(':')[1]);
          if (m > 59) {
            h += Math.floor(m / 60);
            m %= 60;
          }
          this.totalHoure = h + ':' + m;
        }
      });
  }
}
