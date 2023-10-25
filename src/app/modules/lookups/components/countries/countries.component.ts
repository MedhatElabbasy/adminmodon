import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { Country } from '../../models/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [5, 10, 20, 30];
  countries!: Country[];
  countryForm!: FormGroup;
  selectedCountry!: Country | null;
  subscriber!: Subscription;
  modelID = 'delete-country';
  canvasID = 'country-crud';
  filteredCountries='';


  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService,
    private canvasServices: OffcanvasService,
    private fb: FormBuilder,
    private countryService: CountriesService
  ) {
    this.countryForm = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      nameEN: [null, Validators.required],
      ioS2: [null, [Validators.required, Validators.pattern(/\+[0-9]{0,4}$/)]],
      prefixCode: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]{0,4}$/)],
      ],
      regex: [null, Validators.required],
    });
  }

  public get controls(): any {
    return this.countryForm.controls;
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    let data: any = this.route.snapshot.data;
    this.countries = data.countries;
    this.subscriber = this.countryService.updates.subscribe((res) => {
      this.countries = res;
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

  onEditMode(country: Country) {
    this.selectedCountry = country;
    this.countryForm.patchValue(country);
    this.openCanvas(this.canvasID);
  }

  onDelete() {
    this.countryService.delete(this.selectedCountry?.id);
    this.selectedCountry = null;
    this.closeModal(this.modelID);
  }

  onSubmit() {
    if (this.countryForm.invalid) return;
    let model = this.countryForm.value;

    if (!this.selectedCountry) {
      delete model.id;
      this.countryService.add(model);
    } else {
      this.countryService.update(model);
    }
    this.form.resetForm();
    this.closeCanvas(this.canvasID);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriber.unsubscribe();
  }
}
