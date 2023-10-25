import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { StorageKeys } from '../keys/storage-keys';
import { Language } from '../data/languages';
import { LangService } from '../services/lang.service';
import { ErrorService } from '../services/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private messageServices: MessageService, private _error:ErrorService) {}
  errorMessage: string = ''
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
     
      
      catchError((error) => {
        if (request.url.includes('uploadFormFile')) {
          let lang = localStorage.getItem(StorageKeys.lang) ?? 'ar';
          this.errorMessage = lang == 'ar' ? 'هذا الملف اكبر من 2 ميجا بايت لا يمكن رفعه' : "this file size greater than 2 mb can't upload"
          const message = this.setError(error);
          //console.log(message);  
        }
        if(request.url.includes('TakidAdmin/Add')){
          let lang = localStorage.getItem(StorageKeys.lang) ?? 'ar';
          this.errorMessage = lang == 'ar' ? 'رقم الهاتف مسجل من قبل' : "this Mobile Number is already registered"
          const message = this.setError(error);
        console.log(this.errorMessage);
        
          //console.log(message);
          
        }
        const message = this.setError(error);
        let lang = localStorage.getItem(StorageKeys.lang)!;
        this.errorMessage=''
        return throwError(() => error);
       
      })
    );
  }

  setError(error: HttpErrorResponse) {
    console.log(this.errorMessage);
console.log(error.error);
let lang = localStorage.getItem(StorageKeys.lang) ?? 'ar';
let message = lang == 'ar' ? 'حدث خطأ ما' : 'An Error Accrued';
    if (this.errorMessage == '') {
      if (error.error) {
        this.errorMessage = error.error.message;
      }else{
        this.errorMessage = message;
      }
          }else{
            this.errorMessage = this.errorMessage;
          }
   
      // let lang = localStorage.getItem(StorageKeys.lang) ?? 'ar';
      // //let message = lang == 'ar' ? 'حدث خطأ ما' : 'An Error Accrued';
      //     if (error.error) {
      //       console.log(error.error);
            
      //       console.log(this.errorMessage);
      //        if(this.errorMessage == ''){
      //         console.log('true');
              
      //          console.log(this.errorMessage);
      //       this.errorMessage = error.error.message;
      //        }else{
      //         console.log('false');
      //         console.log(this.errorMessage);
      //         this.errorMessage = this.errorMessage;
      //       }
      //     } else {
      //       //this.errorMessage = message;
      //       console.log(this.errorMessage);
      //     }
        
      
    
    this._error.error.next(this.errorMessage);
   
    //return this.errorMessage;
    
  }
}
