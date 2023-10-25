import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserInfo } from 'src/app/modules/auth/models/user-info';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { notify } from 'src/app/modules/dashboard/model/notification';
import { NotificationService } from 'src/app/modules/dashboard/services/notification.service';
import { Language } from '../../data/languages';
import { SIDEBAR_LIST } from '../../data/sidebar-menu';
import { Routing } from '../../routes/app-routes';
import { LangService } from '../../services/lang.service';
declare var $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  sidebarActive: boolean = true;
  sidebarMenu: any[] = [...SIDEBAR_LIST];
  routing = Routing;
  user!: UserInfo;
  searchKey = '';
  throttle = 1000;
  scrollDistance = 1;
  scrollUpDistance = 100;
  direction = "";
  temp!: notify[]
  start: number = 1
  AllNotify: any[] = []
  total: number = 0
  date: any
  img: any
  sum = 10;
  //url:any = [this.router.routerState.snapshot.root];
  url: any = window.location.toString()
  constructor(
    public router: Router,
    public lang: LangService,
    private _notify: NotificationService,
    private auth: AuthService
  ) {
    this.lang.checkLang();
    this.auth.userInfo.subscribe((res) => {
      if (res) {
        this.user = res;
      }
    });
    //console.log(this.url[0]._routerState.url);
    console.log(this.url);

  }

  ngOnInit(): void {
    //this.change();
    this.getnotify();
  }

  onLangChange() {
    if (this.lang.currentLang === Language.ar) {
      this.lang.changeLang(Language.en);
    } else {
      this.lang.changeLang(Language.ar);
    }
  }
  logout() {
    this.auth.logout();
  }
  /* change() {
     setTimeout(() => {
       if (window.location.href.includes('customer%20management')) {
         $('#general_settings').removeClass('show');
       } else {
         if (window.location.href.includes('http://localhost:4200/#/lookups')) {
           $('#monitor').removeClass('show');
         }
       }
     },800);
   }*/


  getnotify() {
    this._notify.notification(this.start, 10).subscribe((response: any) => {
      if (response) {
        this.hideloader();
      }
      this.temp = response.data //1
      this.total = response.totalCount
      console.log(this.temp);
      this.addphotos(this.start, this.sum);  // 2
    }, (error) => {

    })
  }
  addphotos(index: number, sum: number) {


    for (let i = 0; i < sum; i++) {
      if (this.temp[i] != null) {
        //   let daty= this.temp[i].created.split(" ")[0];
        // const [day, month, year] = daty.split("-");
        // this.date = new Date(+year, +month - 1, +day);


        this.AllNotify.push(this.temp[i]);
      }
    }

  }

  onScrollDown() {
    console.log("scrolldown");
    this.start = this.start + 1;
    console.log(this.start, this.sum);
    this.getnotify();
    this.direction = "down";
  }

  hideloader() {
    document.getElementById('loading')!
      .style.display = 'none';
  }


}
