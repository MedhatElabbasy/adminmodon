import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { Financeyear } from '../../models/financeyear';
import { FinanceYearService } from '../../services/finance-year.service';

@Component({
  selector: 'app-finance-year',
  templateUrl: './finance-year.component.html',
  styleUrls: ['./finance-year.component.scss'],
})
export class FinanceYearComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  financeyear!: Financeyear[];
  sizes = [5, 10, 20, 30];
  isArabic!: boolean;
  selectedyear!: Financeyear | null;
  financeForm!: FormGroup;
  modalID = 'delete-financeyear';
  canvasID = 'financeyear-crud';
  filteredYear=''

  constructor(
    private modalService: ModalService,
    private canvasServices: OffcanvasService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private financeservice: FinanceYearService
  ) {
    this.financeForm = this.fb.group({
      name: [null, Validators.required],
      nameEN: [null, Validators.required],
      id: [0],
    });
  }
  public get controls(): any {
    return this.financeForm.controls;
  }

  ngOnInit(): void {
    this.getInitData();
    this.financeservice.financeyearUpdates.subscribe((res) => {
      this.financeyear = res;
    });
  }
  getInitData() {
    let data: any = this.route.snapshot.data;

    this.financeyear = data.initData;
  }
  onEditMode(finance: Financeyear) {
    this.selectedyear = finance;
    this.financeForm.patchValue(finance);
    this.openCanvas(this.canvasID);
  }
  onDelete() {
    this.financeservice.delete(this.selectedyear?.id);
    this.selectedyear = null;
    this.closeModal(this.modalID);
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

  onSubmit() {
    if (this.financeForm.invalid) return;
    let modal = this.financeForm.value;
    if (this.selectedyear) {
      this.financeservice.update(modal);
    } else {
      delete modal.id;
      this.financeservice.add(modal);
    }
    this.closeCanvas(this.canvasID);
  }
}
