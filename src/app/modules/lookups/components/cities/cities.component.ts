import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { Language } from 'src/app/modules/core/data/languages';
import { LangService } from 'src/app/modules/core/services/lang.service';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { City } from '../../models/city';
import { Country } from '../../models/country';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
})
export class CitiesComponent implements OnInit {
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [5, 10, 20, 30];
  cities!: City[];
  countries!: Country[];
  cityForm!: FormGroup;
  selectedCity!: City | null;
  citySubscriber!: Subscription;
  modalID = 'delete-city';
  canvasID = 'city-crud';
  filteredCities='';
  language : string =""

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private citiesService: CityService,
    private modalService: ModalService,
    private canvasServices: OffcanvasService
  ) {
    this.cityForm = this.fb.group({
      id: [null],
      countryId: [null, Validators.required],
      name: [null, Validators.required],
      nameEN: [null, Validators.required],
    });
  }

  public get controls(): any {
    return this.cityForm.controls;
  }

  ngOnInit() {
    this.getInitData();
    this.citySubscriber = this.citiesService.CitiesUpdates.subscribe((res) => {
      this.cities = res;
    });
  }

  getInitData() {
    let data: any = this.route.snapshot.data;

    this.cities = data.initData.cities;
    this.countries = data.initData.countries;
    console.log(this.cities);
    console.log(this.countries)
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }

  onEditMode(city: City) {
    this.selectedCity = city;
    this.cityForm.patchValue(city);
    this.openCanvas(this.canvasID);
  }

  onSubmit() {
    if (this.cityForm.invalid) return;
    let model = this.cityForm.value;
    if (!this.selectedCity) {
      delete model.id;
      this.citiesService.add(model);
    } else {
      this.citiesService.update(model);
    }

    this.closeCanvas(this.canvasID);
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

  onDelete() {
    this.citiesService.delete(this.selectedCity?.id);
    this.selectedCity = null;
    this.closeModal(this.modalID);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.citySubscriber.unsubscribe();
  }
  getCities(){
    this.citiesService.getAllCities().subscribe((res)=>{
      this.cities=res;

      if (this.language == 'english') {
        var x = [];
        var y = [];
  
        const regex = /^[A-Z a-z]/;
        for (let i = 0; i < this.cities.length; i++) {
          if (this.cities[i].nameEN.match(regex)) {
            x.push(this.cities[i]);
          }
        }
        this.cities = [...x.sort()];
        x.sort((a, b) => (a.nameEN < b.nameEN ? -1 : 1));
       
        this.cities = [...x];
      } else if(this.language == 'arabic'){
        var x = [];
        var y = [];
  
        const regex = /^[ء-ي]/;
        for (let i = 0; i < this.cities.length; i++) {
          if (this.cities[i].name.match(regex)) {
            x.push(this.cities[i]);
          }
        }
        this.cities = [...x.sort()];
        x.sort((a, b) => (a.name < b.name ? -1 : 1));
       
        this.cities = [...x];
      }
  
    })

  }
  english(){ this.language="english";
  this.getCities();}
  arabic(){
    this.language='arabic';
    this.getCities();
  }
  clear(){
    this.citiesService.getAllCities().subscribe((res)=>{
      this.cities=res;})
  }
}
