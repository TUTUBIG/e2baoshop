import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

const passwordMatchValidator: ValidatorFn = (compare1: FormControl, compare2: FormControl): ValidationErrors | null => {
  if compare1.value === compare2.value
    return null;
  else
    return {passwordMismatch: true};
};

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.sass']
})
export class PasswordInputComponent implements OnInit {
  hide = true;

  passwordFormControl = new FormGroup({
    password: new FormControl('',Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'));
    confirm: new FormControl()
  });

  confirmFormControl = new FormControl('', passwordMatchValidator(this.passwordFormControl));

  constructor() { }

  ngOnInit(): void { }
}
