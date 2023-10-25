import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { Language } from '../data/languages';
import { StorageKeys } from '../keys/storage-keys';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  language!: BehaviorSubject<string>;
  currentLang!: string;
  public isAr!: BehaviorSubject<boolean>;

  constructor(private translate: TranslateService) {
    this.language = new BehaviorSubject<string>(Language.default);
    this.isAr = new BehaviorSubject<boolean>(true);
  }

  checkLang() {
    let currentLang = localStorage.getItem(StorageKeys.lang);
    if (currentLang) {
      this.changeLang(currentLang);
    } else {
      this.changeLang(Language.default);
    }
  }

  changeLang(lang: string) {
    let flag = lang == Language.ar ? true : false;
    this.isAr.next(flag);
    this.translate.use(lang);
    this.language.next(lang);
    this.currentLang = lang;
    localStorage.setItem(StorageKeys.lang, lang);
    this.changeDocumentAttr(lang);
  }

  changeDocumentAttr(lang: string) {
    let dir = lang === Language.ar ? 'rtl' : 'ltr';

    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', dir);
    document.body.setAttribute('class', lang);
  }
}
