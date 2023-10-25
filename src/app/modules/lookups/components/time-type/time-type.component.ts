import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { Lookup } from '../../models/lookup';
import { TimeTypeService } from '../../services/time-type.service';

@Component({
  selector: 'app-time-type',
  templateUrl: './time-type.component.html',
  styleUrls: ['./time-type.component.scss'],
})
export class TimeTypeComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [5, 10, 20, 30];
  timeTypes!: Lookup[];
  timeTypeForm!: FormGroup;
  selectedLookup!: Lookup | null;
  subscriber!: Subscription;
  modalID = 'delete-time-type';
  canvasID = 'time-type-crud';
  filteredTimeType='';


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: ModalService,
    private canvasServices: OffcanvasService,
    private timeServices: TimeTypeService
  ) {
    this.timeTypeForm = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      nameEN: [null, Validators.required],
    });
  }

  public get controls(): any {
    return this.timeTypeForm.controls;
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    let data: any = this.route.snapshot.data;
    this.timeTypes = data.types;
    this.subscriber = this.timeServices.updates.subscribe((res) => {
      this.timeTypes = res;
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
    this.timeTypeForm.patchValue(scale);
    this.openCanvas(this.canvasID);
  }

  onDelete() {
    this.timeServices.delete(this.selectedLookup?.id);
    this.selectedLookup = null;
    this.closeModal(this.modalID);
  }

  onSubmit() {
    if (this.timeTypeForm.invalid) return;
    let model = this.timeTypeForm.value;
    if (!this.selectedLookup) {
      delete model.id;
      this.timeServices.add(model);
    } else {
      this.timeServices.update(model);
    }

    this.closeCanvas(this.canvasID);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriber.unsubscribe();
  }
}
