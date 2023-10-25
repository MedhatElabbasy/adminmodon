import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { UserInfo } from 'src/app/modules/auth/models/user-info';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Country } from 'src/app/modules/lookups/models/country';
import { AcceptedExtension } from '../../data/accepted_extension';
import { AdminupdateService } from '../../services/adminupdate.service';
import { AttachmentService } from '../../services/attachment.service';
import { LookupsService } from '../../services/lookups.service';
import { OffcanvasService } from '../../services/offcanvas.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;
  id: string = '';
  user!: UserInfo;
  userForm!: FormGroup;
  profileImage!: string | null;
  code = new FormControl('', [Validators.required]);
  codes: Country[] = [];
  canvasId = 'edit-profile';

  constructor(private auth: AuthService,
    private attachment: AttachmentService,
     private fb: FormBuilder,
     private _lookups:LookupsService,
     private _admin:AdminupdateService,
      public canvas: OffcanvasService) {
    this.auth.userInfo.subscribe((res) => {
      if (res) {
        this.user = res;
        console.log(this.user)
      }
    });
    this.generateUserForm();
  }

  get controls(): any {
    return this.userForm.controls;
  }

  get MobileNumber(): FormControl | any {
    return this.userForm.controls['phoneNumber'];
  }

  ngOnInit() {
    this.getInitData();
  }

  onEdit() {
    console.log("ssss");
  
   this.profileImage=this.user.photo.fullLink;
   this.userForm.controls['photoId'].setValue(this.user.photo.id);
    this.userForm.patchValue(this.user);
   // this.cdr.detectChanges()
    this.canvas.open(this.canvasId);
  }


  generateUserForm(){
    this.userForm=this.fb.group({
      firstName: [null,[
        Validators.required,
        Validators.pattern(`^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+(?:\s[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+)?$`),
      ]],
      middleName: [''],
      lastName: ['', [
        Validators.required,
        Validators.pattern(`^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+(?:\s[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+)?$`),
      ],],
      email: ['', [Validators.required,Validators.email]],
       photoId:['',[Validators.required]],
       mobileNumber:['',[Validators.required]],
       countryId:[''],
       isActive:[''],
       isTakidSuperAdmin:[''],
       appUserId:['']
    })
    
  }

  getInitData(){
   

    this._lookups.getCountriesCodes().subscribe((x)=>
    {x.forEach(element => {this.codes.push(element)
      
    })
    
    });
  
    
  }

  
  onImageUpload(event: any) {
    let arr = event?.target?.files[0]?.name.split('.');
    const extension = arr[arr.length - 1].toLowerCase();

    if (!AcceptedExtension.includes(extension)) {
      (this.controls['photoId'] as FormControl).setErrors({
        notValid: true,
      });
      this.profileImage = null;
      return;
    } else {
      let url = URL.createObjectURL(event.target.files[0]);
     
      (this.controls['photoId'] as FormControl).setErrors({
        notValid: null,
      });
     
      this.attachment
        .uploadFile(event.target.files[0].name, event.target.files[0])
        .subscribe((res) => {
          this.profileImage = url;
            this.controls['photoId'].setValue(res);
          
        });
    }
  }

  
reset(){}
update(userForm:FormGroup){
  console.log("update")
  if(this.userForm.invalid){return}
  let modal = this.userForm.value;
  modal.id = this.user.id;
  console.log(modal);
  this._admin.update(modal).subscribe((res)=> console.log(res))
  this.canvas.close(this.canvasId);
  setTimeout(() => {
    location.reload();
  }, 500);
}

}
