import { Component, OnInit } from '@angular/core';
import { MyServicesService } from "../shared/my-services.service";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  username = '';
  constructor(private _services: MyServicesService, private _router: Router,
    private toastr: ToastrService) {
    this._services.getUserName()
      .subscribe(
        data => this.username = data.toString(),
        error => this._router.navigate(['/main/login'])
      );
  }

  ngOnInit() {
    
  }

  logout(){
    this.toastr.warning('Logged out.', 'MINDTREE')
    localStorage.removeItem('jwtoken');
    this._router.navigate(['/main/login']);
  }
}
