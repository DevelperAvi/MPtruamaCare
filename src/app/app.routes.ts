import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; // Ensure correct path
import { LoginComponent } from './login/login.component'; // Ensure correct path

export const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' } ,

   // Wildcard route for a 404 page or redirect
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
