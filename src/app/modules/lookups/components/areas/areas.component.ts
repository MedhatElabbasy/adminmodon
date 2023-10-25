import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LangService } from 'src/app/modules/core/services/lang.service';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { Area } from '../../models/Area';
import { City } from '../../models/city';
import { AreaService } from '../../services/area.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss'],
})
export class AreasComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [5, 10, 20, 30];
  language :string =''

  areas: Area[] = [];
  cities!: City[];
  isArabic!: boolean;
  selectedArea: Area | null = null;
  AreaForm!: FormGroup;
  modalID = 'delete-Area';
  canvasID = 'Area-crud';
  filteredAreas='';

  exampleForm!: FormGroup;

  constructor(
    private modalService: ModalService,
    private canvasServices: OffcanvasService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private areasService: AreaService
  ) {
    this.exampleForm = this.fb.group({
      email: [null, Validators.required],
    });

    this.AreaForm = this.fb.group({
      cityId: [null, Validators.required],
      name: [null, Validators.required],
      nameEN: [null, Validators.required],
      id: [0],
    });
  }

  public get controls(): any {
    return this.AreaForm.controls;
  }

  ngOnInit() {
    this.getInitData();
    this.areasService.AreasUpdates.subscribe((res) => {
      this.areas = res;
    });
  }

  getInitData() {
    let data: any = this.route.snapshot.data;

    this.areas = data.initData.areas;
    this.cities = data.initData.cities;
  }

  public get Email(): FormControl {
    return this.exampleForm.get('email') as FormControl;
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }

  onEditMode(area: Area) {
    this.selectedArea = area;
    this.AreaForm.patchValue(area);
    this.openCanvas(this.canvasID);
  }

  onDelete() {
    this.areasService.delete(this.selectedArea?.id);
    this.selectedArea = null;
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
    if (this.AreaForm.invalid) return;
    let modal = this.AreaForm.value;
    if (this.selectedArea) {
      this.areasService.update(modal);
    } else {
      delete modal.id;
      this.areasService.add(modal);
    }
    this.closeCanvas(this.canvasID);
  }
  getCities(){
    this.areasService.getAllAreas().subscribe((res)=> 
    {
      this.areas=res;
      if (this.language == 'ascending') {
        var x = [];
        var y = [];

        const regex = /^[ي-]/;
        for (let i = 0; i < this.areas.length; i++) {
          if (this.areas[i].name.match(regex)) {
            x.push(this.areas[i]);
          } else {
            y.push(this.areas[i]);
          }
        }
        this.areas = [...x.sort(), ...y.sort()];
        x.sort((a, b) => (a.name < b.name ? -1 : 1));
        y.sort((a, b) => (a.name < b.name ? -1 : 1));
        this.areas = [...x, ...y];
      } else {
        var x = [];
        var y = [];

        const regex = /^[ء-ي]/;
        for (let i = 0; i < this.areas.length; i++) {
          if (this.areas[i].name.match(regex)) {
            x.push(this.areas[i]);
          } else {
            y.push(this.areas[i]);
          }
        }
        this.areas = [...x.sort(), ...y.sort()];
        x.sort((a, b) => (a.name < b.name ? -1 : 1));
        y.sort((a, b) => (a.name < b.name ? -1 : 1));
        this.areas = [...x, ...y];
      }
    }
    );
    
    
  }

  english(){
      this.language="ascending";
      this.getCities();
  }
  arabic(){
    this.language='descending';
    this.getCities();
  }
}
