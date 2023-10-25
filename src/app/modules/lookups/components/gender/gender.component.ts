import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { Gender } from '../../models/gender';
import { GenderService } from '../../services/gender.service';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.scss'],
})
export class GenderComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  genders!: Gender[];
  sizes = [5, 10, 20, 30];
  isArabic!: boolean;
  selectedgender!: Gender | null;
  genderForm!: FormGroup;
  modalID = 'delete-gender';
  canvasID = 'gender-crud';
  filteredGender=''

  constructor(
    private modalService: ModalService,
    private canvasServices: OffcanvasService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private genderservice: GenderService
  ) {
    this.genderForm = this.fb.group({
      name: [null, Validators.required],
      nameEN: [null, Validators.required],

      id: [0],
    });
  }
  public get controls(): any {
    return this.genderForm.controls;
  }

  ngOnInit(): void {
    this.getInitData();
    this.genderservice.genderUpdates.subscribe((res) => {
      this.genders = res;
    });
  }
  getInitData() {
    let data: any = this.route.snapshot.data;

    this.genders = data.initData;
  }

  onEditMode(gender: Gender) {
    this.selectedgender = gender;
    this.genderForm.patchValue(gender);
    this.openCanvas(this.canvasID);
    console.log(gender);
  }
  onDelete() {
    this.genderservice.delete(this.selectedgender?.id);
    this.selectedgender = null;
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
    if (this.genderForm.invalid) return;
    let modal = this.genderForm.value;
    if (this.selectedgender) {
      this.genderservice.update(modal);
    } else {
      delete modal.id;
      this.genderservice.add(modal);
    }
    this.closeCanvas(this.canvasID);
  }
}
