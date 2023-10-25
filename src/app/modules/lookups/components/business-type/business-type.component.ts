import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { Lookup } from '../../models/lookup';
import { BusinessTypeService } from '../../services/business-type.service';

@Component({
  selector: 'app-business-type',
  templateUrl: './business-type.component.html',
  styleUrls: ['./business-type.component.scss'],
})
export class BusinessTypeComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [5, 10, 20, 30];
  businessTypes!: Lookup[];
  businessTypeForm!: FormGroup;
  selectedLookup!: Lookup | null;
  subscriber!: Subscription;
  modalID = 'delete-time-type';
  canvasID = 'time-type-crud';
  filteredBuinessType='';


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: ModalService,
    private canvasServices: OffcanvasService,
    private businessTypeServices: BusinessTypeService
  ) {
    this.businessTypeForm = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      nameEN: [null, Validators.required],
    });
  }

  public get controls(): any {
    return this.businessTypeForm.controls;
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    let data: any = this.route.snapshot.data;
    this.businessTypes = data.types;
    this.subscriber = this.businessTypeServices.updates.subscribe((res) => {
      this.businessTypes = res;
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

  onEditMode(scale: Lookup) {
    this.selectedLookup = scale;
    this.businessTypeForm.patchValue(scale);
    this.openCanvas(this.canvasID);
  }

  onDelete() {
    this.businessTypeServices.delete(this.selectedLookup?.id);
    this.selectedLookup = null;
    this.closeModal(this.modalID);
  }
  onSubmit() {
    if (this.businessTypeForm.invalid) return;
    let model = this.businessTypeForm.value;
    if (!this.selectedLookup) {
      delete model.id;
      this.businessTypeServices.add(model);
    } else {
      this.businessTypeServices.update(model);
    }
    this.closeCanvas(this.canvasID);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriber.unsubscribe();
  }
}
