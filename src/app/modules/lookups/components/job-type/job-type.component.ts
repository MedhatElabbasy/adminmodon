import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { Jobtype } from '../../models/jobtype';
import { JobtypeService } from '../../services/jobtype.service';

@Component({
  selector: 'app-job-type',
  templateUrl: './job-type.component.html',
  styleUrls: ['./job-type.component.scss'],
})
export class JobTypeComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  jobtypes!: Jobtype[];
  sizes = [5, 10, 20, 30];
  isArabic!: boolean;
  selectedjobtype!: Jobtype | null;
  jobtypeForm!: FormGroup;
  modalID = 'delete-jobtype';
  canvasID = 'jobtype-crud';
  filteredJob='';


  constructor(
    private modalService: ModalService,
    private canvasServices: OffcanvasService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private jobtypeservice: JobtypeService
  ) {
    this.jobtypeForm = this.fb.group({
      name: [null, Validators.required],
      nameEN: [null, Validators.required],
      fName: [null, Validators.required],
      fNameEN: [null, Validators.required],
      id: [0],
    });
  }
  public get controls(): any {
    return this.jobtypeForm.controls;
  }

  ngOnInit(): void {
    this.getInitData();
    this.jobtypeservice.jobtypeUpdates.subscribe((res) => {
      this.jobtypes = res;
    });
  }
  getInitData() {
    let data: any = this.route.snapshot.data;

    this.jobtypes = data.initData;
  }
  onEditMode(jobtype: Jobtype) {
    this.selectedjobtype = jobtype;
    this.jobtypeForm.patchValue(jobtype);
    this.openCanvas(this.canvasID);
  }
  onDelete() {
    this.jobtypeservice.delete(this.selectedjobtype?.id);
    this.selectedjobtype = null;
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
    if (this.jobtypeForm.invalid) return;
    let modal = this.jobtypeForm.value;
    if (this.selectedjobtype) {
      this.jobtypeservice.update(modal);
    } else {
      delete modal.id;
      this.jobtypeservice.add(modal);
    }
    this.closeCanvas(this.canvasID);
  }
}
