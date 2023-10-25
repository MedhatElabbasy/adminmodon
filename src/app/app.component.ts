import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorObserver } from 'rxjs';
import { AuthService } from './modules/auth/services/auth.service';
import { Language } from './modules/core/data/languages';
import { ErrorService } from './modules/core/services/error.service';
import { LangService } from './modules/core/services/lang.service';
import { ModalService } from './modules/core/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'takid-admin';
  message: string = '';
  modalId = 'error';
  constructor(
    public router: Router,
    private lang: LangService,
    private auth: AuthService,
    private modal:ModalService,
    private _error:ErrorService
  ) {
    this.auth.autoLogin();
    this.lang.checkLang();

    this._error.error.subscribe((res) => {
      if(res){
      this.message = res;
      console.log(res);
      
      modal.open('error');
    }
    });
  }
}
