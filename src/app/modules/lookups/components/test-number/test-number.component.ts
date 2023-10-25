import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { TestNumber } from '../../models/test-number';
import { TestNumberService } from '../../services/test-number.service';

@Component({
  selector: 'app-test-number',
  templateUrl: './test-number.component.html',
  styleUrls: ['./test-number.component.scss']
})
export class TestNumberComponent implements OnInit {
  canvasID = 'test-number';
  testNumberForm!:FormGroup;
  testNumbers!:TestNumber[];
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [5, 10, 20, 30];
  selectedNumber!:TestNumber|null;

  filteredNumber='';


  constructor(
    private route: ActivatedRoute,
    private canvasServices: OffcanvasService,
    private fb: FormBuilder,
    private numberService:TestNumberService) {

      this.testNumberForm= this.fb.group({

        phoneNumber:[null,Validators.required],
        phoneToSendCode:[null,Validators.required],
        id: [0],

      })
    }

    public get controls(): any {
      return this.testNumberForm.controls;
    }


  ngOnInit(): void {
    this.getData();
    this.numberService.updates.subscribe((res) => {
      this.testNumbers = res;
      console.log(this.testNumbers)
    });
  }

  getData() {
    let data: any = this.route.snapshot.data;

    this.testNumbers = data.initData;
  }


  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }

  openCanvas(id: string) {
    this.canvasServices.open(id);
  }

  closeCanvas(id: string) {
    this.canvasServices.close(id);
  }

  onEdit(testNumber: TestNumber) {
    this.selectedNumber = testNumber;
    this.testNumberForm.patchValue(testNumber);
    this.openCanvas(this.canvasID);
  }

  onSubmit(){
    if(this.testNumberForm.invalid) return;
    let model =this.testNumberForm.value;

    if(this.selectedNumber){
      this.numberService.update(model)
    }else{
      delete model.id;
      this.numberService.add(model);

    }
    this.closeCanvas(this.canvasID);
  }

}
