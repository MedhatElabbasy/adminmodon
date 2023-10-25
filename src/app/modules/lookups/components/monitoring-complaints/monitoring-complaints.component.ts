import { LocalizedString } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ComplaintsService } from '../../services/complaints.service';
declare var $: any;
@Component({
  selector: 'app-monitoring-complaints',
  templateUrl: './monitoring-complaints.component.html',
  styleUrls: ['./monitoring-complaints.component.scss'],
})
export class MonitoringComplaintsComponent implements OnInit {
  myData: any;
  pageSize = 10;
  pageNumber = 1;
  sizes = [5, 10, 20, 30];
  constructor(private _ComplaintsService: ComplaintsService) {}

  ngOnInit(): void {
    $(`#link1`).parent().addClass('myBorder');
  }
 /* mark(event: any) {
    $('a').parent().removeClass('myBorder');
    var x = event?.target?.id;
    $(`#${x}`).parent().addClass('myBorder');

    if (x == 'link1') {
      this._ComplaintsService
        .getAll(this.pageNumber, this.pageSize)
        .subscribe((res) => {
          this.myData = res;
          
        });
    } else if (x == 'link2') {
      this._ComplaintsService
      .getAll(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        this.myData = [];

        
      });
    } else if (x == 'link3') {
    } else {
    }
  }*/
}
