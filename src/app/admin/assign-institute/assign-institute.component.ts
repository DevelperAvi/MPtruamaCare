import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MasterService } from '../../service/masterService';
import { response } from 'express';
import { UserProfileService } from '../../service/user-profile.service';
import { error } from 'console';

@Component({
  selector: 'app-assign-institute',
  templateUrl: './assign-institute.component.html',
  styleUrls: ['./assign-institute.component.css']
})
export class AssignInstituteComponent implements OnInit {
  districts: any[] = [];
  healthInstitutes: any[] = [];
  users: any[] = [];
  selectedDistrict: any = null;
  selectedHealthInstitute: any = null;
  selectedUser: any = null;

  constructor(private masterService: MasterService , private userService: UserProfileService) { }

  ngOnInit(): void {
    this.loadDropdowns();
  }

  loadDropdowns(): void {
    this.masterService.getDistrictById(23).subscribe(
      data => this.districts = data,
      error => console.error('Error loading districts', error),
    );
    console.log(this.districts);

    this.userService.getAll().subscribe(
      data => this.users = data,
      error =>console.error('Error loading districts', error),
    )
  }

  onDistrictChange(districtId: string): void {
    if (districtId) {
      this.masterService.getHealthInstitutesByDistrict().subscribe(
        (response: any) => {
          if (response && response.status && Array.isArray(response.response)) {
            this.healthInstitutes = response.response;
          } else {
            console.error('Unexpected response format', response);
          }
        },
        (error) => {
          console.error('Error fetching states:', error);
        }
      );
    }
  }


  onMap(): void {
    if (!this.selectedDistrict || !this.selectedHealthInstitute || !this.selectedUser) {
      Swal.fire('Error!', 'Please select all required fields.', 'error');
      return;
    }

    Swal.fire({
      title: 'Confirm Assignment',
      text: `District: ${this.selectedDistrict}\nHealth Institute: ${this.selectedHealthInstitute}\nUser: ${this.selectedUser}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, assign it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        const assignment = {
          instituteId: this.selectedHealthInstitute,
          userId: this.selectedUser,
          createdBy: 'CurrentUser', // Update with actual logged-in user
          createdTime: new Date(),
          isAssigned: true
        };

        this.masterService.assignInstitute(assignment).subscribe(
          response => {
            Swal.fire('Assigned!', 'The health institute has been assigned.', 'success');
          },
          error => {
            Swal.fire('Error!', 'An error occurred while assigning.', 'error');
          }
        );
      }
    });
  }
}
