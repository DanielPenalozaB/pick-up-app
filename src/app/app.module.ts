import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PickupComponent } from './pages/pickup/pickup.component';
import { RegisterComponent } from './pages/register/register.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { PickupStudentComponent } from './components/pickup-student/pickup-student.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		LoginComponent,
		RegisterComponent,
		PickupComponent,
		NavbarComponent,
  PickupStudentComponent,
  RegisterStudentComponent,
  ProfileComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		CommonModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot(),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
