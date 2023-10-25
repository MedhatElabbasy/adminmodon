import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientsCompanies } from '../../models/clients-companies';
import { Pagination } from '../../models/pagination';
import { ClientsCompaniesService } from '../../services/clients-companies.service';
import { OffcanvasService } from '../../services/offcanvas.service';

@Component({
  selector: 'app-clients-companies',
  templateUrl: './clients-companies.component.html',
  styleUrls: ['./clients-companies.component.scss'],
})
export class ClientsCompaniesComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [5, 10, 20, 30];
  clients!: ClientsCompanies[];
  searchKey!: string;

  language: string = '';
  clientDetails: any;
  canvasID = 'clientDetails';
  filter: string = '';
  key!: any;
  typingTimer!: any; //timer identifier
  doneTypingInterval = 1000;
  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsCompaniesService,
    public _canvas: OffcanvasService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    let data: Pagination<ClientsCompanies> =
      this.route.snapshot.data['clients'];
    this.clients = data.data;
    this.total = data.totalCount;
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
    this.getClients();
  }

  onPageChange(event: number) {
    this.pageNumber = event;
    this.getClients();
  }

  getClients() {
    if (this.filter == '') {
      this.clientsService
        .getALlCompanies(this.pageNumber, this.pageSize)
        .subscribe((res) => {
          this.clients = res.data;
          this.total = res.totalCount;
   
        });
    } else if (this.filter == 'active') {
      this.clientsService
        .getALlActiveCompanies(this.pageNumber, this.pageSize)
        .subscribe((res) => {
          this.clients = res.data;
          this.total = res.totalCount;
     
        });
    } else if (this.filter == 'deActive') {
      this.clientsService
        .getALlNotActiveCompanies(this.pageNumber, this.pageSize)
        .subscribe((res) => {
          this.clients = res.data;
          this.total = res.totalCount;
    
        });
    }
  }

  // english() {
  //   this.language = 'english';
  //   this.getClients();
  // }
  // arabic() {
  //   this.language = 'arabic';
  //   this.getClients();
  // }
  filterActive() {
    this.filter = 'active';
    this.getClients();
  }
  filterDeActive() {
    this.filter = 'deActive';
    this.getClients();
  }
  clear() {
    this.language = '';
    this.filter = '';
    this.getClients();
  }
  Details(item: ClientsCompanies, event: any) {
    event.stopImmediatePropagation();
    this.clientDetails = item;
    this._canvas.open(this.canvasID);
  }

  toggleState(item: ClientsCompanies, event: any) {
    if (event.checked) {
      this.clientsService.active(item.id);
    } else {
      this.clientsService.deactive(item.id);
    }
  }
  stopEvent(event: any) {
    event.stopImmediatePropagation();
  }

  keyupFunction(event: any) {
    this.key = event.target.value;
    console.log(this.key);
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.doneTyping(this.key);
    }, this.doneTypingInterval);
  }

  keydownfunction() {
    clearTimeout(this.typingTimer);
    console.log(this.typingTimer);
  }

  doneTyping(key: string) {
    console.log(key);
    if (this.key == '') {
      this.getClients();
    } else {
      this.clientsService
        .search(this.key, this.pageNumber, this.pageSize)
        .subscribe((res: any) => {
          console.log(res);
          this.clients = res.data;
          this.total = res.totalCount;
          console.log(this.total);
        });
    }
  }
}
