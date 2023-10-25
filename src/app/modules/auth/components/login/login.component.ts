import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SecretKeys } from 'src/app/modules/core/keys/secret-keys';
import { Routing } from 'src/app/modules/core/routes/app-routes';
import { CryptoService } from 'src/app/modules/core/services/crypto.service';
import { LangService } from 'src/app/modules/core/services/lang.service';
import { Country } from 'src/app/modules/lookups/models/country';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  forgotPasswordLink = `/${Routing.auth.module}/${Routing.auth.children.forgotPassword}`;
  codes!: any;
  code = new FormControl(null, [Validators.required]);
  loginForm!: FormGroup;
  key = SecretKeys.recaptcha;
  captcha: any = {
    theme: 'light',
    size: 'normal',
    type: 'image',
  };

  constructor(
    private route: ActivatedRoute,
    public lang: LangService,
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private crypto: CryptoService
  ) {
    this.initForm();
  }

  get MobileNumber(): FormControl | any {
    return this.loginForm.controls['mobileNumber'];
  }

  get Recaptcha() {
    return this.loginForm.controls['recaptcha'] as FormControl;
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

  initForm() {
    this.loginForm = this.fb.group({
      recaptcha: [null, Validators.required],
      mobileNumber: [null, [Validators.required]],
      register: [false],
      authtype: [5],
    });

    this.code.valueChanges.subscribe((res) => {
      let code: Country = this.codes.find((e: Country) => e.prefixCode == res);

      this.MobileNumber.clearValidators();
      this.MobileNumber.updateValueAndValidity();

      this.MobileNumber.addValidators([
        Validators.pattern(code.regex),
        Validators.required,
      ]);
      this.MobileNumber.updateValueAndValidity();
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    let model = this.loginForm.value;
    let prefixCode = this.code.value;
    let number: string = model.mobileNumber;
    delete model.recaptcha;
    let phoneCountry: Country = this.codes.find(
      (e: Country) => e.prefixCode == prefixCode
    );

    model['phoneCountryId'] = phoneCountry.id;

    if (number.startsWith('0')) {
      number = number.substring(1);
    }

    if (!model.mobileNumber.startsWith(phoneCountry.prefixCode)) {
      model.mobileNumber = phoneCountry.prefixCode + number;
    }

    this.auth.generateOTP(model).subscribe((response) => {
      let url = `/${Routing.auth.module}/${Routing.auth.children.otp}`;
      this.router.navigate([url,this.crypto.encrypt(JSON.stringify(model))]);
    });

    console.log(model);
  }
}
