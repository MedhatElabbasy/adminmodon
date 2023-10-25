import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { Lookup } from '../../models/lookup';
import { TimeTypeService } from '../../services/time-type.service';
import { TimeZoneService } from '../../services/time-zone.service';

@Component({
  selector: 'app-time-zone',
  templateUrl: './time-zone.component.html',
  styleUrls: ['./time-zone.component.scss'],
})
export class TimeZoneComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [5, 10, 20, 30];
  timeZones!: Lookup[];
  timeZoneForm!: FormGroup;
  selectedLookup!: Lookup | null;
  subscriber!: Subscription;
  modalID = 'delete-zone';
  canvasID = 'zone-crud';
  filteredTimeZone='';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: ModalService,
    private canvasServices: OffcanvasService,
    private timeServices: TimeZoneService
  ) {
    this.timeZoneForm = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      nameEN: [null, Validators.required],
    });
  }

  public get controls(): any {
    return this.timeZoneForm.controls;
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    let data: any = this.route.snapshot.data;
    this.timeZones = data.zones;
    this.subscriber = this.timeServices.updates.subscribe((res) => {
      this.timeZones = res;
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
    this.timeZoneForm.patchValue(scale);
    this.openCanvas(this.canvasID);
  }

  onDelete() {
    this.timeServices.delete(this.selectedLookup?.id);
    this.selectedLookup = null;
    this.closeModal(this.modalID);
  }

  onSubmit() {
    if (this.timeZoneForm.invalid) return;
    let model = this.timeZoneForm.value;
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
