import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { SitemapService } from '../../service/sitemap.service';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  doctorDetails: any = {};
  loading = true;
  error: string | null = null;
  currentUser: any;

  constructor(private doctorService: SitemapService, private authService:AuthService) { }

  ngOnInit(): void {

    const userId = this.authService.getCurrentUser();
   // console.log(userId) // Ensure this method retrieves the userId correctly
    this.loadDoctorDetails(userId);
  }

  loadDoctorDetails(userId: any): void {
    console.log(userId.nameid)
    this.loading = true;
    this.doctorService.getDoctorDetails(userId.nameid).subscribe(
      response => {
        console.log(response)
        this.doctorDetails = response.response;
        this.loading = false;
      },
      error => {
        console.error('Error fetching doctor details', error);
        this.error = 'Unable to load doctor details. Please try again later.';
        this.loading = false;
      }
    );
  }
}
