import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgOtpInputComponent } from 'ng-otp-input';
import { Routing } from 'src/app/modules/core/routes/app-routes';
import { CryptoService } from 'src/app/modules/core/services/crypto.service';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { SecurityCompaniesRoutes } from 'src/app/modules/security-companies/routes/security-companies-routes.enum';
import { OTP } from '../../models/otp';
import { VerifyModel } from '../../models/verify-model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;
  @ViewChild(NgOtpInputComponent, { static: false })
  ngOtpInput!: NgOtpInputComponent;
  loginModel!: OTP
  phone: any;
  otpForm!: FormGroup;
  authType!: string;
  errorMessage!:string
  modalID="verfication-error"

  otpConfig = {
    allowNumbersOnly: true,
    length: 6,
  };
 
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private crypto: CryptoService,
    private auth: AuthService,
    private modalService:ModalService
  ) {
    this.otpForm = this.fb.group({
      code: [
        null,
        [Validators.required, Validators.maxLength(6), Validators.minLength(6)],
      ],
    });
   
   
  }

  ngOnInit() {
    this.getInitData();
  }

  get code(): FormControl | any {
    return this.otpForm.controls['code'];
  }

  getInitData() {
    this.route.params.subscribe((params) => {
      //  this.authType = params['type'];
      // this.phone = this.crypto.decrypt(params['phone']);
    
      this.loginModel=JSON.parse(this.crypto.decrypt(params['phone']))
      console.log(this.loginModel)
    });
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  onSubmit() {
    if (this.otpForm.invalid) return;

    let model: VerifyModel = {
      mobileNumber: this.loginModel.mobileNumber,
      register: false,
      otp: +this.otpForm.value.code,
    };

    this.auth.verify(model)  .subscribe((response) => {
      this.auth.handleToken(response.id_token);
      this.router.navigate([`/${Routing.dashboard.module}`]);
     console.log(response);
     
    },
    // error=>{
    //     this.errorMessage=error.error.message;
    //     this.openModal(this.modalID);
    //     console.log(this.errorMessage);
    // }
    );
   
  }


  resendOtp() {
  //  const model={mobileNumber: '201014927101', register: false, authtype: 5, phoneCountryId: 1}
  //   // this.form.resetForm();
  //   // this.ngOtpInput.setValue(null);
  //   // this.loginModel.register = false;
  //   this.loginModel={
  //     mobileNumber:this.phone,
  //     register:false,
  //     authtype:this.authType,
  //    phoneCountryId:1
  //   }
    this.auth.generateOTP(this.loginModel).subscribe(() => {});
  }
}
