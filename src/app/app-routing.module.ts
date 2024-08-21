import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { HodDashboardComponent } from './hod/hod-dashboard/hod-dashboard.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { DistrictDashboardComponent } from './district/district-dashboard/district-dashboard.component';
import { AuthGuard } from './service/auth/auth.guard';
import { DistrictMasterComponent } from './admin/district-master/district-master.component';
import { LogoutComponent } from './logout/logout.component';
import { UserProfileUpdateComponent } from './user-profile-update/user-profile-update.component';
import { HealthInstituteRegistrationComponent } from './admin/health-institute-registration/health-institute-registration.component';
import { UserMannualsComponent } from './public/user-mannuals/user-mannuals.component';
import { FormatsComponent } from './public/formats/formats.component';
import { GuidLinesComponent } from './public/guid-lines/guid-lines.component';
import { DoctorRegistrationComponent } from './admin/doctor-registration/doctor-registration.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { UpdateProfileComponent } from './admin/update-profile/update-profile.component';
import { TraumaRegisterFormComponent } from './doctor/truamaregistration/truamaregistration.component';
import { AssignInstituteComponent } from './admin/assign-institute/assign-institute.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'user-mannuals', component:UserMannualsComponent },
  { path: 'formates', component:FormatsComponent },
  { path: 'guidlines', component:GuidLinesComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserProfileUpdateComponent , canActivate: [AuthGuard] },
  { path: 'doctor-registration', component: DoctorRegistrationComponent , canActivate: [AuthGuard] },
  { path: 'updateProfile', component: UpdateProfileComponent , canActivate: [AuthGuard] },
  { path: 'truamaregistration', component: TraumaRegisterFormComponent , canActivate: [AuthGuard] },
  { path: 'assignInstitute', component: AssignInstituteComponent , canActivate: [AuthGuard] },
  { path: 'userlist', component: UserListComponent , canActivate: [AuthGuard] },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'HelthInstituteRegistration', component: HealthInstituteRegistrationComponent, canActivate: [AuthGuard] },
  { path: 'UserRegistration', component: HealthInstituteRegistrationComponent, canActivate: [AuthGuard] },
  { path: 'hod-dashboard', component: HodDashboardComponent, canActivate: [AuthGuard] },
  { path: 'doctor-dashboard', component: DoctorDashboardComponent,  canActivate: [AuthGuard]},
  { path: 'district-dashboard', component: DistrictDashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin/district-master', component: DistrictMasterComponent },
  { path: 'admin/district-master/edit/:id', component: DistrictMasterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
