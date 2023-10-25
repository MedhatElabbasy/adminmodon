import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { Lookup } from '../../models/lookup';
import { CompanyScaleService } from '../../services/company-scale.service';
import { CompanyTypeService } from '../../services/company-type.service';

@Component({
  selector: 'app-company-type',
  templateUrl: './company-type.component.html',
  styleUrls: ['./company-type.component.scss'],
})
export class CompanyTypeComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [5, 10, 20, 30];
  types!: Lookup[];
  typeForm!: FormGroup;
  selectedLookup!: Lookup | null;
  subscriber!: Subscription;
  modalID = 'delete-type';
  canvasID = 'type-crud';
  filteredCompany=''

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: ModalService,
    private canvasServices: OffcanvasService,
    private typeServices: CompanyTypeService
  ) {
    this.typeForm = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      nameEN: [null, Validators.required],
    });
  }

  public get controls(): any {
    return this.typeForm.controls;
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    let data: any = this.route.snapshot.data;
    this.types = data.types;
    this.subscriber = this.typeServices.updates.subscribe((res) => {
      this.types = res;
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
    this.typeForm.patchValue(scale);
    this.openCanvas(this.canvasID);
  }

  onDelete() {
    this.typeServices.delete(this.selectedLookup?.id);
    this.selectedLookup = null;
    this.closeModal(this.modalID);
  }

  onSubmit() {
    if (this.typeForm.invalid) return;
    let model = this.typeForm.value;
    if (!this.selectedLookup) {
      delete model.id;
      this.typeServices.add(model);
    } else {
      this.typeServices.update(model);
    }

    this.closeCanvas(this.canvasID);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriber.unsubscribe();
  }
}
