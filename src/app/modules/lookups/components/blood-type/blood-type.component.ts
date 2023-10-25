import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { BloodType } from '../../models/bloodType';
import { BloodTypeService } from '../../services/blood-type.service';

@Component({
  selector: 'app-blood-type',
  templateUrl: './blood-type.component.html',
  styleUrls: ['./blood-type.component.scss'],
})
export class BloodTypeComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  bloodtypes!: BloodType[];
  sizes = [5, 10, 20, 30];
  isArabic!: boolean;
  selectedtype!: BloodType | null;
  bloodForm!: FormGroup;
  modalID = 'delete-bloodtype';
  canvasID = 'bloodtype-crud';
  filteredBloodType='';


  constructor(
    private modalService: ModalService,
    private canvasServices: OffcanvasService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bloodservice: BloodTypeService
  ) {
    this.bloodForm = this.fb.group({
      name: [null, Validators.required],
      nameEN: [null, Validators.required],
      id: [0],
    });
  }
  public get controls(): any {
    return this.bloodForm.controls;
  }

  ngOnInit(): void {
    this.getInitData();
    this.bloodservice.bloodUpdates.subscribe((res) => {
      this.bloodtypes = res;
    });
  }
  getInitData() {
    let data: any = this.route.snapshot.data;

    this.bloodtypes = data.initData;
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }

  onEditMode(blood: BloodType) {
    this.selectedtype = blood;
    this.bloodForm.patchValue(blood);
    this.openCanvas(this.canvasID);
  }

  onDelete() {
    this.bloodservice.delete(this.selectedtype?.id);
    this.selectedtype = null;
    this.closeModal(this.modalID);
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
    if (this.bloodForm.invalid) return;
    let modal = this.bloodForm.value;
    if (this.selectedtype) {
      this.bloodservice.update(modal);
    } else {
      delete modal.id;
      this.bloodservice.add(modal);
    }
    this.closeCanvas(this.canvasID);
  }
}
