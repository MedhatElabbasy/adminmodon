import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject,tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TestNumber } from '../models/test-number';

@Injectable({
  providedIn: 'root'
})
export class TestNumberService {
  private readonly url = environment.apiUrl;
  testNumbers!:TestNumber[];
  private numbersUpdates = new Subject<TestNumber[]>();


  constructor(private http: HttpClient) { }

  get updates() {
    return this.numbersUpdates.asObservable();
  }

  getAllNumbers(){
    return this.http
      .get<TestNumber[]>(this.url + `api/TestNumber/GetAll`)
      .pipe(
        tap((res) => {
          this.testNumbers = [...res];
          this.numbersUpdates.next([...this.testNumbers]);
        })
      );

  }

  add(model: TestNumber) {
    this.http
      .post<TestNumber>(this.url + `api/TestNumber/Add`, model)
      .subscribe((response) => {
        model.id = response.id;
        this.testNumbers.push(model);
        this.numbersUpdates.next([...this.testNumbers]);
      });
  }


  update(model: TestNumber) {
    this.http
      .post<TestNumber>(this.url + `api/TestNumber/Update`, model)
      .subscribe((response) => {
        const index = this.testNumbers.findIndex((e) => e.id == response.id);
        this.testNumbers[index] = response;
        this.numbersUpdates.next([...this.testNumbers]);
      });
  }
  
}
