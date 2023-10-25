import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { CompanyScale } from '../../models/company-scale';
import { CompanyScaleService } from '../../services/company-scale.service';

@Component({
  selector: 'app-company-scale',
  templateUrl: './company-scale.component.html',
  styleUrls: ['./company-scale.component.scss'],
})
export class CompanyScaleComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [5, 10, 20, 30];
  scales!: CompanyScale[];
  scaleForm!: FormGroup;
  selectedScale!: CompanyScale | null;
  subscriber!: Subscription;
  modalID = 'delete-scale';
  canvasID = 'scale-crud';
  filteredCompany='';


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: ModalService,
    private canvasServices: OffcanvasService,
    private scaleServices: CompanyScaleService
  ) {
    this.scaleForm = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      nameEN: [null, Validators.required],
    });
  }

  public get controls(): any {
    return this.scaleForm.controls;
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    let data: any = this.route.snapshot.data;
    this.scales = data.scales;
    this.subscriber = this.scaleServices.updates.subscribe((res) => {
      this.scales = res;
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

  onEditMode(scale: CompanyScale) {
    this.selectedScale = scale;
    this.scaleForm.patchValue(scale);
    this.openCanvas(this.canvasID);
  }

  onDelete() {
    this.scaleServices.delete(this.selectedScale?.id);
    this.selectedScale = null;
    this.closeModal(this.modalID);
  }

  onSubmit() {
    if (this.scaleForm.invalid) return;
    let model = this.scaleForm.value;
    if (!this.selectedScale) {
      delete model.id;
      this.scaleServices.add(model);
    } else {
      this.scaleServices.update(model);
    }

    this.closeCanvas(this.canvasID);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriber.unsubscribe();
  }
}
