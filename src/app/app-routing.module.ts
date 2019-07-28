import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './main/register/register.component';
import { LoginComponent } from './main/login/login.component';
import { DashComponent } from './dash/dash.component';

const routes: Routes = [
  { path: '', redirectTo: 'main/login', pathMatch: 'full' },
  { path: 'main/login', component: LoginComponent },
  { path: 'main/register', component: RegisterComponent },
  { path: 'dash', component: DashComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
