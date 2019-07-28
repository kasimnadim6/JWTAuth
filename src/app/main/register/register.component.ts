import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { passwordValidator } from "src/app/shared/password.validator";
import { MyServicesService } from "../../shared/my-services.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  successMessage = '';

  constructor(private _fb: FormBuilder, private _services: MyServicesService,
    private toastr: ToastrService, private _router: Router) { }

  ngOnInit() {
    this.registrationForm = this._fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.required],
      EMPCode: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', Validators.required],
      confirmPassword: ['']
    }, { validator: passwordValidator });

    this.registrationForm.controls.password.valueChanges
      .subscribe(
        x => this.registrationForm.controls.confirmPassword.updateValueAndValidity()
      );
  }


  // isValid(controlName){
  //   return this.registrationForm.get(controlName).invalid && this.registrationForm.get(controlName).touched;
  // }

  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }
  get EMPCode() {
    return this.registrationForm.get('EMPCode');
  }
  get password() {
    return this.registrationForm.get('password');
  }

  register() {
    console.log(this.registrationForm.value);
    this._services.createUser(this.registrationForm.value)
      .subscribe(
        data => {
          this.toastr.success('User registered Successfully.', 'MINDTREE Ltd.,');
          this.registrationForm.reset();
          this._router.navigate(['/main/login']);
        },
        error => this.toastr.error('User Already exist.', 'MINDTREE Ltd.,')
      );

  }
}
