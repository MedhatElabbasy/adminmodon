import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { OptionSet } from '../../models/option-set';
import { OptionSetItems } from '../../models/option-set-items';
import { OptionsetService } from '../../services/optionset.service';

@Component({
  selector: 'app-option-set',
  templateUrl: './option-set.component.html',
  styleUrls: ['./option-set.component.scss'],
})
export class OptionSetComponent implements OnInit {
  canvasID = 'option-set';
  optonSetForm!: FormGroup;
  optionsets!: OptionSet[];
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [5, 10, 20, 30];
  modelID = 'delete-optionset';
  selectedOptionSet!: OptionSet | null;
  subscriber!: Subscription;
  optionSetItems!: OptionSetItems[];
  language=''

  //  regex = /^[A-Z].*$/
  //  noSpacesRegex = /.*\S.*/;

  filteredOptionSet = '';
  results!: any[];

  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService,
    private canvasServices: OffcanvasService,
    private fb: FormBuilder,
    private optionset: OptionsetService
  ) {
    this.optonSetForm = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      displayNameAr: [null, Validators.required],
      displayNameEN: [null, Validators.required],
    });
  }

  public get controls(): any {
    return this.optonSetForm.controls;
  }

  ngOnInit(): void {
    this.getData();
    this.optionset.updates.subscribe((res) => {
      this.optionsets = res;


    });
  }

  getData() {
    let data: any = this.route.snapshot.data;

    this.optionsets = data.initData;
    
    
    if (this.language == 'fromAtoZ') {
      var x = [];
      var y = [];

      const regex = /^[A-Z a-z]/;
      for (let i = 0; i < this.optionsets.length; i++) {
        if (this.optionsets[i].name.match(regex)) {
          x.push(this.optionsets[i]);
        } 
      }
      this.optionsets = [...x.sort()];
      x.sort((a, b) => (a.name < b.name ? -1 : 1));
     
      this.optionsets = [...x];
    } else if (this.language == 'fromZtoA') {
      var x = [];
      var y = [];

      const regex =/^[A-Z a-z]/;
      for (let i = 0; i < this.optionsets.length; i++) {
        if (this.optionsets[i].name.match(regex)) {
          x.push(this.optionsets[i]);
        } 
      }
      this.optionsets = [...x.sort()];
      x.sort((b, a) => (a.name < b.name ? -1 : 1));
     
      this.optionsets = [...x];
    }

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

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  onDelete() {
    this.optionset.delete(this.selectedOptionSet?.id);
    this.selectedOptionSet = null;
    this.closeModal(this.modelID);
    this.getData();
  }
  onEdit(optionset: OptionSet) {
    this.selectedOptionSet = optionset;
    this.optonSetForm.patchValue(optionset);
    this.openCanvas(this.canvasID);
    this.getData();
  }

  onSubmit() {
    if (this.optonSetForm.invalid) return;
    let model = this.optonSetForm.value;
    model.name = this.convertToPascalCase(model.name);
    console.log(model);

    if (this.selectedOptionSet) {
      this.optionset.update(model);
    } else {
      this.optionset.add(model);
      this.getData();
    }
    this.closeCanvas(this.canvasID);
  }

  onSearch() {
    this.optionset.getOPtionSetByName(this.filteredOptionSet);
  }

  convertToPascalCase(word: string) {
    word = word.trim().toLowerCase();
    let arr = word.split(' ');
    arr = arr.map((str) => str.charAt(0).toUpperCase() + str.slice(1));
    let res: string = arr.toLocaleString().split(',').join('');
    return res;
  }

  clear(){
    let data: any = this.route.snapshot.data;

    this.optionsets = data.initData;
   
    
  }
  fromAtoZ(){
    this.language='fromAtoZ'
    this.getData()
  }
  fromZtoA(){
    this.language='fromZtoA'
    this.getData()
  }
}
