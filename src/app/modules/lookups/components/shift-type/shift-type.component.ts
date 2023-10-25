import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { Lookup } from '../../models/lookup';
import { ShiftService } from '../../services/shift.service';

@Component({
  selector: 'app-shift-type',
  templateUrl: './shift-type.component.html',
  styleUrls: ['./shift-type.component.scss'],
})
export class ShiftTypeComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [5, 10, 20, 30];
  shifts!: Lookup[];
  shiftForm!: FormGroup;
  selectedLookup!: Lookup | null;
  subscriber!: Subscription;
  modalID = 'delete-type';
  canvasID = 'type-crud';
  filteredShiftType='';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: ModalService,
    private canvasServices: OffcanvasService,
    private shiftServices: ShiftService
  ) {
    this.shiftForm = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      nameEN: [null, Validators.required],
    });
  }

  public get controls(): any {
    return this.shiftForm.controls;
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    let data: any = this.route.snapshot.data;
    this.shifts = data.shifts;
    this.subscriber = this.shiftServices.updates.subscribe((res) => {
      this.shifts = res;
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
    this.shiftForm.patchValue(scale);
    this.openCanvas(this.canvasID);
  }

  onDelete() {
    this.shiftServices.delete(this.selectedLookup?.id);
    this.selectedLookup = null;
    this.closeModal(this.modalID);
  }

  onSubmit() {
    if (this.shiftForm.invalid) return;
    let model = this.shiftForm.value;
    if (!this.selectedLookup) {
      delete model.id;
      this.shiftServices.add(model);
    } else {
      this.shiftServices.update(model);
    }

    this.closeCanvas(this.canvasID);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriber.unsubscribe();
  }
}
