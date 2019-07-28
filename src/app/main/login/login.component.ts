import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MyServicesService } from '../../shared/my-services.service';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private _fb: FormBuilder, private _services: MyServicesService,private _routers:Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      EMPCode: ['', [Validators.required, Validators.minLength(3)]],
      password: [''],
    })
  }

  get EMPCode() {
    return this.loginForm.get('EMPCode');
  }

  login() {
    console.log(this.loginForm.value);
    this._services.login(this.loginForm.value)
    .subscribe(
      data=>{console.log(data);
        this.toastr.info('Loggin Successfully.', 'MINDTREE Ltd.,')
        localStorage.setItem('jwtoken',data.toString());
        this._routers.navigate(['/dash']);
      },
      error=>this.toastr.error('Invalid EMPCode or Password.', 'MINDTREE Ltd.,')
    );
  }

}
