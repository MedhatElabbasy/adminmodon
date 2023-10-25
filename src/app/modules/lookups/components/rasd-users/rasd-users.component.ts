import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormGroupDirective,
} from '@angular/forms';

import { AcceptedExtension } from 'src/app/modules/core/data/accepted_extension';
import { AttachmentService } from 'src/app/modules/core/services/attachment.service';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';

import { RasdService } from '../../services/rasd.service';
import { rasdUser } from './../../models/rasdUser';

@Component({
  selector: 'app-rasd-users',
  templateUrl: './rasd-users.component.html',
  styleUrls: ['./rasd-users.component.scss'],
})
export class RasdUsersComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;
  id: string = '';
  selectedUser!: rasdUser | null;
  active: string = '';
  language: string = '';
  allUsers: any;
  data: any;
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [5, 10, 20, 30];
  searchKey = '';
  profileImage!: string | null;
  userForm: FormGroup = this.fb.group({
    photoId: [null, [Validators.required]],
    firstName: [
      null,
      [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
    ],
    lastName: [
      null,

      [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
    ],
    middleName: [
      null,
      [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
    ],
    phoneNumber: { value: '', disabled: true },
    phoneNumber2: { value: '', disabled: true },
    email: [null, [Validators.required, Validators.email]],
    idNumber: { value: '', disabled: true },
    isActive: false,
  });
  constructor(
    private _RasdService: RasdService,
    private fb: FormBuilder,
    private modalService: ModalService,
    private canvasServices: OffcanvasService,
    private attachment: AttachmentService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
    this.getUsers();
  }

  onPageChange(event: number) {
    this.pageNumber = event;
    this.getUsers();
  }

  getUsers() {
    this._RasdService
      .getAll(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        this.allUsers = res;
        if (this.active == '') {
          this.allUsers;
        } else if (this.active == 'active') {
          let all = this.allUsers.filter((element: rasdUser) => {
            return element.isActive;
          });
          this.allUsers = all;
        } else{
          let all = this.allUsers.filter((element: rasdUser) => {
            return !element.isActive;
          });
          this.allUsers = all;
        } 

         if (this.language == 'english') {
          var x = [];
          var y = [];

          const regex = /^[A-Z a-z]/;
          for (let i = 0; i < this.allUsers.length; i++) {
            if (this.allUsers[i].firstName.match(regex)) {
              x.push(this.allUsers[i]);
            } else {
              y.push(this.allUsers[i]);
            }
          }
          this.allUsers=[...x.sort(),...y.sort()]
          x.sort((a, b) => a.firstName < b.firstName ? -1 : 1)
          y.sort((a, b) => a.firstName < b.firstName ? -1 : 1)
          this.allUsers=[...x,...y]
          console.log(this.allUsers);
          
        } else if(this.language == 'arabic') {
          var x = [];
          var y = [];

          const regex = /^[ء-ي]/;
          for (let i = 0; i < this.allUsers.length; i++) {
            if (this.allUsers[i].firstName.match(regex)) {
              x.push(this.allUsers[i]);
            } else {
              y.push(this.allUsers[i]);
            }
          }
          this.allUsers=[...x.sort(),...y.sort()]
          x.sort((a, b) => a.firstName < b.firstName ? -1 : 1)
          y.sort((a, b) => a.firstName < b.firstName ? -1 : 1)
          this.allUsers=[...x,...y]
          console.log(this.allUsers);
        }
      });
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

  toggleState(user: rasdUser, event: any) {
    if (event.checked) {
      this._RasdService.active(user);
    } else {
      this._RasdService.deActive(user);
    }
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
      this.profileImage = url;
      this.attachment
        .uploadFile(event.target.files[0].name, event.target.files[0])
        .subscribe((res) => {
          if (res != null) {
            this.userForm.controls['photoId'].setValue(res);
          }
        });
    }
  }

  onEditMode(user: rasdUser) {
    this.id = user.id;

    this.data = user.photo.fullLink;
    console.log(this.data);
    this.userForm.patchValue(user);
    this.openCanvas('canvasID');
  }
  update(userForm: FormGroup) {
    if (this.userForm.invalid) return;
    let modal = this.userForm.value;
    modal.id = this.id;
    console.log(modal);
    this._RasdService.update(modal, this.profileImage);
    this.getUsers();
    this.closeCanvas('canvasID');
  }
  filterActive() {
    this.active = 'active';
    this.getUsers();
  }
  filterDeActive() {
    this.active = 'deactive';
    this.getUsers();
  }
  english() {
    this.language = 'english';
    this.getUsers();
  }
  arabic() {
    this.language = 'arabic';
    this.getUsers();
  }

  clear(){
    this._RasdService
    .getAll(this.pageNumber, this.pageSize)
    .subscribe((res) => {
      this.allUsers = res;
      console.log(this.allUsers);
    });
  }
}
