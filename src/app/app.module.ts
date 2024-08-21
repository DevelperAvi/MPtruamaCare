import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router'; // Import RouterModule and Routes for routing
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // Import HttpClientModule for API calls
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { RegistrationStepsModule } from './registration-steps/registration-steps.module';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { HodDashboardComponent } from './hod/hod-dashboard/hod-dashboard.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { DistrictDashboardComponent } from './district/district-dashboard/district-dashboard.component';
import { AuthInterceptor } from './auth/interceptor';
import { AuthGuard } from './service/auth/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { DistrictMasterComponent } from './admin/district-master/district-master.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { UserProfileUpdateComponent } from './user-profile-update/user-profile-update.component';
import { HealthInstituteRegistrationComponent } from './admin/health-institute-registration/health-institute-registration.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderInterceptor } from './loader.interceptor';
import { UserMannualsComponent } from './public/user-mannuals/user-mannuals.component';
import { FormatsComponent } from './public/formats/formats.component';
import { GuidLinesComponent } from './public/guid-lines/guid-lines.component';
import { DoctorRegistrationComponent } from './admin/doctor-registration/doctor-registration.component';
import { UpdateProfileComponent } from './admin/update-profile/update-profile.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { AssignInstituteComponent } from './admin/assign-institute/assign-institute.component';
import { TraumaRegisterFormComponent } from './doctor/truamaregistration/truamaregistration.component';

// Define your application routes
const routes: Routes = [
  { path: '', component: HomeComponent }, // Home route
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'HelthInstituteRegistration', component: HealthInstituteRegistrationComponent, canActivate: [AuthGuard] },
  { path: 'UserRegistration', component: HealthInstituteRegistrationComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserProfileUpdateComponent, canActivate: [AuthGuard] },
  { path: 'hod-dashboard', component: HodDashboardComponent, canActivate: [AuthGuard] },
  { path: 'doctor-dashboard', component: DoctorDashboardComponent, canActivate: [AuthGuard] },
  { path: 'district-dashboard', component: DistrictDashboardComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent },


];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DistrictMasterComponent,
    LogoutComponent,
    UserProfileUpdateComponent,
    HealthInstituteRegistrationComponent,
    LoaderComponent,
    DoctorRegistrationComponent,
    UpdateProfileComponent,
   UserListComponent,
   DoctorDashboardComponent,
   AssignInstituteComponent   ,
   TraumaRegisterFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    HeaderComponent,
    TopBarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    AboutComponent,
    ContactComponent,
    CarouselComponent
    , RegistrationStepsModule,
    AdminDashboardComponent,
    HodDashboardComponent,
    DistrictDashboardComponent,
    AppRoutingModule,
    ReactiveFormsModule,
    UserMannualsComponent,
    FormatsComponent,
    GuidLinesComponent,
    FormsModule   ,
    HttpClientModule




  ],

  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent] // Bootstrapping the AppComponent
})
export class AppModule { }
