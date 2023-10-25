import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { AvailableServices } from '../../models/available-services';
import { Available_servicesService } from '../../services/available_services.service';
@Component({
  selector: 'app-available-services',
  templateUrl: './available-services.component.html',
  styleUrls: ['./available-services.component.scss'],
})
export class AvailableServicesComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  avaliable_services: AvailableServices[] = [];
  sizes = [5, 10, 20, 30];
  isArabic!: boolean;
  selectedService!: AvailableServices | null;
  ServiceForm!: FormGroup;
  modalID = 'delete-service';
  canvasID = 'service-crud';
  filteredServices='';


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private canvasServices: OffcanvasService,
    private available: Available_servicesService
  ) {
    this.ServiceForm = this.fb.group({
      name: [null, Validators.required],
      nameEN: [null, Validators.required],
      id: [0],
    });
  }
  public get controls(): any {
    return this.ServiceForm.controls;
  }

  ngOnInit(): void {
    this.getInitData();
    this.available.available_servicesUpdates.subscribe((res) => {
      this.avaliable_services = res;
    });
  }

  getInitData() {
    let data: any = this.route.snapshot.data;
    this.avaliable_services = data.initData;
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }

  onEditMode(service: AvailableServices) {
    this.selectedService = service;
    this.ServiceForm.patchValue(service);
    this.openCanvas(this.canvasID);
  }

  onDelete() {
    this.available.delete(this.selectedService?.id);
    this.selectedService = null;
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
    if (this.ServiceForm.invalid) return;
    let modal = this.ServiceForm.value;
    if (this.selectedService) {
      this.available.update(modal);
    } else {
      delete modal.id;
      this.available.add(modal);
    }
    this.closeCanvas(this.canvasID);
  }
}
