import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { Nationality } from '../../models/Nationality';
import { NationalityService } from '../../services/nationality.service';

@Component({
  selector: 'app-nationality',
  templateUrl: './nationality.component.html',
  styleUrls: ['./nationality.component.scss'],
})
export class NationalityComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  nationalities!: Nationality[];
  sizes = [5, 10, 20, 30];
  isArabic!: boolean;
  selectednationality!: Nationality | null;
  nationalityForm!: FormGroup;
  modalID = 'delete-nationality';
  canvasID = 'nationality-crud';
  filteredNationality='';


  constructor(
    private modalService: ModalService,
    private canvasServices: OffcanvasService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private nationalityservice: NationalityService
  ) {
    this.nationalityForm = this.fb.group({
      name: [null, Validators.required],
      nameEN: [null, Validators.required],
      id: [0],
    });
  }
  public get controls(): any {
    return this.nationalityForm.controls;
  }

  ngOnInit(): void {
    this.getInitData();
    this.nationalityservice.nationalityUpdates.subscribe((res) => {
      this.nationalities = res;
    });
  }
  getInitData() {
    let data: any = this.route.snapshot.data;

    this.nationalities = data.initData;
  }

  onEditMode(nationality: Nationality) {
    this.selectednationality = nationality;
    this.nationalityForm.patchValue(nationality);
    this.openCanvas(this.canvasID);
  }
  onDelete() {
    this.nationalityservice.delete(this.selectednationality?.id);
    this.selectednationality = null;
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
    if (this.nationalityForm.invalid) return;
    let modal = this.nationalityForm.value;
    if (this.selectednationality) {
      this.nationalityservice.update(modal);
    } else {
      delete modal.id;
      this.nationalityservice.add(modal);
    }
    this.closeCanvas(this.canvasID);
  }
}
