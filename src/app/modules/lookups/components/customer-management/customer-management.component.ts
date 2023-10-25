import { Component, OnInit, ViewChild } from '@angular/core';
import { rasdUser } from '../../models/rasdUser';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { Country } from 'src/app/modules/lookups/models/country';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { AcceptedExtension } from 'src/app/modules/core/data/accepted_extension';
import { AttachmentService } from 'src/app/modules/core/services/attachment.service';

import { CountriesService } from './../../services/countries.service';
import { RasdService } from '../../services/rasd.service';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { Pagination } from 'src/app/modules/core/models/pagination';
@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss'],
})
export class CustomerManagementComponent implements OnInit {
  users!: Pagination<rasdUser>;
  errorMessage!:string
  modalID="verfication-error"
  selectUser!: rasdUser | null;
  @ViewChild('form') form!: FormGroupDirective;
  canvasID = 'rasd-crud';
  codes: any;
  code1 = new FormControl(null, [Validators.required]);
  code2 = new FormControl(null, [Validators.required]);
  profileImage!: string | null;
  userForm: FormGroup = this.fb.group({
    photoId: [null, [Validators.required]],
    firstName: [
      null,
      [Validators.required, Validators.pattern(`^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+(?:\s[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+)?$`)],
    ],
    lastName: [
      null,

      [Validators.required, Validators.pattern(`^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+(?:\s[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+)?$`)],
    ],
    middleName: [
      null,
      [Validators.required, Validators.pattern(`^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+(?:\s[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+)?$`)],
    ],
    phoneNumber: [null, [Validators.required]],
    phoneNumber2: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    idNumber: [null, [Validators.required]],
    isActive: false,
  });
  constructor(
    private canvasServices: OffcanvasService,
    private fb: FormBuilder,
    private attachment: AttachmentService,
    private country: CountriesService,
    private RasdService: RasdService,
    private modalService:ModalService
  ) {}

  ngOnInit(): void {
    // this.codeListener();
    this.getData();
  }
  openCanvas(id: string) {
    this.canvasServices.open(id);
  }

  closeCanvas(id: string) {
    this.canvasServices.close(id);
  }


  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  addUser(userForm: FormGroup) {
    if (this.userForm.invalid) return;
    let model = this.userForm.value;
    let phone1 = this.code1.value;
    let phone2 = this.code2.value;
    let prrfix1 = this.codes.find((element: Country) => {
      return element.ioS2 == phone1;
    });
    let prrfix2 = this.codes.find((element: Country) => {
      return element.ioS2 == phone2;
    });
    let number1: string = model.phoneNumber;
    let number2: string = model.phoneNumber2;
    if (number1.startsWith('0')) {
      number1 = number1.substring(1);
    }
    if (number2.startsWith('0')) {
      number2 = number2.substring(1);
    }

    if (!model.phoneNumber?.startsWith(phone1)) {
      model.phoneNumber = prrfix1.prefixCode + number1;
    }

    if (!model.phoneNumber2?.startsWith(phone2)) {
      model.phoneNumber2 = prrfix2.prefixCode + number2;
    }
    this.RasdService.addUser(this.userForm.value, this.profileImage) .subscribe((response: any) => {
      let user = { ...response, photo: { fullLink: this.profileImage } };
      this.form.resetForm();
      this.profileImage = null;
      this.closeCanvas(this.canvasID);
      // setTimeout(() => {
      //   location.reload();
      // }, 1000);
      this.RasdService.users.totalCount += 1;
      this.RasdService.users.data.push(user);
      this.RasdService._updates.next(this.RasdService.users);
    },
    error=>{
      this.errorMessage=error.error.message;
      this.openModal(this.modalID);
      console.log(this.errorMessage);
    }
    );
  }
  onImageUpload(event: any) {
    let arr = event?.target?.files[0]?.name.split('.');
    const extension = arr[arr.length - 1].toLowerCase();

    if (!AcceptedExtension.includes(extension)) {
      (this.userForm.controls['photoId'] as FormControl).setErrors({
        notValid: true,
      });
      this.profileImage = null;
      return;
    } else {
      let url = URL.createObjectURL(event.target.files[0]);
      (this.userForm.controls['photoId'] as FormControl).setErrors({
        notValid: null,
      });
      
      this.attachment
        .uploadFile(event.target.files[0].name, event.target.files[0])
        .subscribe((res) => {
          if (res != null) {
            this.profileImage = url;
            this.userForm.controls['photoId'].setValue(res);
          }
        });
    }
  }

  getData() {
    this.country.getAllCountries().subscribe((res) => {
      this.codes = res;
      let defaultCountry = this.codes.find((element: Country) => {
        return element.ioS2 == '+966';
      });
      this.code1.setValue(defaultCountry.ioS2);
      this.code2.setValue(defaultCountry.ioS2);
    });
  }
}
