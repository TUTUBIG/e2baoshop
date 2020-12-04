import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

const passwordMatchValidator: ValidatorFn = (abControl: AbstractControl): ValidationErrors | null => {
  const control = abControl as FormGroup;
  const password = control.get('password');
  const confirm = control.get('confirm');
  if ( password?.value === confirm?.value ) {
    return null;
  } else {
    console.log('000000');
    return { passwordMatched: false };
  }
};

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.sass']
})
export class PasswordInputComponent implements OnInit {
  hide = true;

  passwordFormControl = new FormGroup({
    password: new FormControl('', Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')),
    confirm: new FormControl('')
  }, {
    validators: passwordMatchValidator
  });

  get password(): FormControl {
    return this.passwordFormControl.get('password') as FormControl;
  }
  get confirm(): FormControl {
    return this.passwordFormControl.get('confirm') as FormControl;
  }

  constructor() { }

  ngOnInit(): void { }
}
