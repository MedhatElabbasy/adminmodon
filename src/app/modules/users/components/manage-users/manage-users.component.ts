import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { UserInfo } from 'src/app/modules/auth/models/user-info';
import { AcceptedExtension } from 'src/app/modules/core/data/accepted_extension';
import { Pagination } from 'src/app/modules/core/models/pagination';
import { Routing } from 'src/app/modules/core/routes/app-routes';
import { AttachmentService } from 'src/app/modules/core/services/attachment.service';
import { LangService } from 'src/app/modules/core/services/lang.service';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { Country } from 'src/app/modules/lookups/models/country';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;
  links = {
    users: `${Routing.users.children.users}`,
    roles: `${Routing.users.children.roles}`,
  };

  canvasID = 'add-user';
  userForm!: FormGroup;
  codes!: any;
  code = new FormControl(null, [Validators.required]);
  profileImage!: string | null;
  modalID="numberExists"
  error:string=""
  private _updates = new Subject<Pagination<any>>();
  users!: Pagination<UserInfo>;

  constructor(
    private canvasServices: OffcanvasService,
    private userServices: UsersService,
    private attachment: AttachmentService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public modalService:ModalService,
    public lang:LangService
  ) {
    this.generateUserForm();
    this.codeListener();

  }

  get userControls(): any {
    return this.userForm.controls;
  }

  get MobileNumber(): any {
    return this.userForm.get('mobileNumber');
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.codes = (this.route.snapshot.data as any).codes;
    let defaultCountry = this.codes.find((element: Country) => {
      return element.ioS2 === '+966';
    });

    this.code.setValue(defaultCountry.prefixCode);
   

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

  generateUserForm() {
    this.userForm = this.fb.group({
      isActive: [false],
      firstName: [null, [Validators.required, Validators.pattern(`^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+(?:\s[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+)?$`)]],
      lastName: [null, [Validators.required ,  Validators.pattern(`^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+(?:\s[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+)?$`)]],
      email: [null, [Validators.required, Validators.email]],
      mobileNumber: [null, [Validators.required]],
      photoId: [null, Validators.required],
      countryId: [null, [Validators.required]],
      isTakidSuperAdmin:[false]
    });
  }
  toLowerCase(): void {
    this.userForm.controls['firstName'].setValue(
      this.userForm.controls['firstName'].value.toLowerCase()
    );
    console.log(this.userForm.controls['firstName'].value);
  }
  codeListener() {
    this.code.valueChanges.subscribe((res) => {
      let code: Country = this.codes.find((e: Country) => e.prefixCode == res);

      this.userForm.controls['countryId'].setValue(code.id);
      this.MobileNumber.clearValidators();
      this.MobileNumber.updateValueAndValidity();

      this.MobileNumber.addValidators([
        Validators.pattern(code.regex),
        Validators.required,
      ]);

      this.MobileNumber.updateValueAndValidity();
    });
  }

  addUser() {
    if (this.userForm.invalid) return;
    this.toLowerCase();
    let model = this.userForm.value;
    console.log(model)
    let phoneCountry: Country = this.codes.find(
      (e: Country) => e.id == model.countryId
    );
    let number: string = model.mobileNumber;

    if (number.startsWith('0')) {
      number = number.substring(1);
    }

    if (!model.mobileNumber.startsWith(phoneCountry.prefixCode)) {
      model.mobileNumber = phoneCountry.prefixCode + number;
    }

    this.userServices.add(this.userForm.value, this.profileImage).subscribe((response:any)=>{
      let user = { ...response, photo: { fullLink: this.profileImage } };
      console.log(user);
      console.log(this.userServices.users);
      
      
        console.log(this.userServices.users.totalCount)
        this.userServices.users.data.push(user);
        this.userServices._updates.next(this.users);
      this.error=""
      this.form.resetForm();
      this.profileImage = null;
      this.closeCanvas(this.canvasID);
      
    },
    // (error)=>{
    //   this.openModal(this.modalID)
    //   this.error="error"
    // }
    )
   
  }

  onImageUpload(event: any) {
    let arr = event?.target?.files[0]?.name.split('.');
    const extension = arr[arr.length - 1].toLowerCase();
    if (!AcceptedExtension.includes(extension)) {
      (this.userControls['photoId'] as FormControl).setErrors({
        notValid: true,
      });
      this.profileImage = null;
      return;
    } else {
      let url = URL.createObjectURL(event.target.files[0]);
      (this.userControls['photoId'] as FormControl).setErrors({
        notValid: null,
      });
      
      this.attachment
        .uploadFile(event.target.files[0].name, event.target.files[0])
        .subscribe((res) => {
          this.profileImage = url;
          this.userControls['photoId'].setValue(res);
        });
    }
  }
  exsit() {
    this.userForm.reset();
    this.profileImage = null;
  }
}
