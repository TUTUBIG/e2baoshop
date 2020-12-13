import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {LoginRequest, LoginResponse, LoginService} from '../login.service';

const matchValidator: ValidatorFn = (inputAB: AbstractControl): ValidationErrors | null => {
  const inputA = inputAB.get('password') as FormControl;
  const inputB = inputAB.get('confirm') as FormControl;
  console.log(inputA.value, inputB.value);
  if ( inputA.value === inputB.value ) {
    return null;
  } else {
    inputB.setErrors({ disMatched: true });
    return { disMatched: true };
  }
};

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.sass']
})
export class EmailLoginComponent implements OnInit {

  constructor(private backend: LoginService) { }

  get email(): FormControl {
    return this.emailLogin.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.emailLogin.get('passwordFormControl')?.get('password') as FormControl;
  }
  get confirm(): FormControl {
    return this.emailLogin.get('passwordFormControl')?.get('confirm') as FormControl;
  }
  hide = true;

  emailLogin = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    passwordFormControl: new FormGroup({
      password: new FormControl('', Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$')),
      confirm: new FormControl(),
    }, { validators: matchValidator }),
  });

  login(): void {
    console.log('login components: ', this.email.value, this.password.value);
    const loginRequest: LoginRequest = {
      email: this.email.value,
      password: this.password.value
    };
    console.log('components: ', loginRequest);
    this.backend.login(loginRequest).subscribe(data => {
      const loginResponse = data as LoginResponse;
      console.log('uid: ', loginResponse.uid);
    });
  }

  ngOnInit(): void {}


}
