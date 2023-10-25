import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { OptionSet, OptionSetItems } from '../../models/option-set-items';
import { OptionSetItemsService } from '../../services/option-set-items.service';

@Component({
  selector: 'app-option-set-items',
  templateUrl: './option-set-items.component.html',
  styleUrls: ['./option-set-items.component.scss'],
})
export class OptionSetItemsComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;

  canvasID = 'option-set_Items';
  optonSetItemForm!: FormGroup;
  optionsetItems!: OptionSetItems[];
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [5, 10, 20, 30];
  modelID = 'delete-optionsetitem';
  selectedOptionSetItem!: any;
  subscriber!: Subscription;
  optionSets!: OptionSet[];
  selectedoptionset!: OptionSet | null;
  optionSetIdContorl!: FormControl;
  filteredOptionSetItem = '';
  sort=''

  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService,
    private canvasServices: OffcanvasService,
    private fb: FormBuilder,
    private optionSetItem: OptionSetItemsService
  ) {
    this.optonSetItemForm = this.fb.group({
      id: [null],
      value: [null, Validators.required],
      nameAr: [null, Validators.required],
      nameEn: [null, Validators.required],
      optionSetId: [null, Validators.required],
      color: [null, Validators.required],
    });

    this.optionSetIdContorl = new FormControl(null, Validators.required);
  }

  public get controls(): any {
    return this.optonSetItemForm.controls;
  }

  public get Color(): FormControl {
    return this.optonSetItemForm.get('color') as FormControl;
  }

  ngOnInit(): void {
    this.getData();

    this.optionSetIdContorl.valueChanges.subscribe((res) => {
      this.getAllByOptionSetId(res);
      this.controls.optionSetId.patchValue(res);
      this.selectedoptionset = res;
      console.log(this.selectedoptionset);
      
    });
  }

  getData() {
    let data: any = this.route.snapshot.data;
    this.optionSets = data.initData;
    console.log(this.optionSets);
    
  }

  getAllByOptionSetId(id: any) {
    this.optionSetItem.getAllOptionSetItems(id).subscribe((res) => {
      this.optionsetItems = res;
      //console.log(this.optionsetItems);
      // if(this.sort=='ascending'){
      // var x: any[] = [];
      // this.optionsetItems = [...x.sort()];
      // x.sort((a, b) => (b.value-a.value));
     
      // this.optionsetItems = [...x];
      // }
    });
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  openCanvas(id: string) {
    this.canvasServices.open(id);
  }

  closeCanvas(id: string) {
    this.canvasServices.close(id);
  }

  onDelete(id: any) {
    this.optionSetItem
      .delete(id)
      .subscribe(() => this.getAllByOptionSetId(this.optionSetIdContorl.value));
    this.selectedOptionSetItem = null;
    this.closeModal(this.modelID);
  }

  onEdit(optionSetItem: OptionSetItems) {
    this.selectedOptionSetItem = optionSetItem;
    this.optonSetItemForm.patchValue(optionSetItem);
    this.openCanvas(this.canvasID);
  }

  onAdd() {
    this.selectedOptionSetItem = null;
    this.form.resetForm();
    this.openCanvas(this.canvasID);
  }

  onSubmit() {
    this.controls.optionSetId.patchValue(this.selectedoptionset);
    if (this.optonSetItemForm.invalid) return;
    let model = this.optonSetItemForm.value;

    if (this.selectedOptionSetItem) {
      this.optionSetItem.update(model).subscribe((res) => {
        this.getAllByOptionSetId(this.selectedoptionset);
      });
    } else {
      this.optionSetItem.add(model).subscribe((res) => {
        this.getAllByOptionSetId(this.selectedoptionset);
      });
    }
    this.form.resetForm();
    this.closeCanvas(this.canvasID);
  }
 
  descending(){
   this.optionsetItems=this.optionsetItems.sort((a,b)=>b.value-a.value)
  
  }
  ascending(){
    this.optionsetItems=this.optionsetItems.sort((a,b)=>a.value-b.value)
  }
}
