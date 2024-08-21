import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfileService } from '../service/user-profile.service'; // Adjust the path if needed
import { UserProfile } from '../service/models/user-profile.model';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.css']
})
export class UserProfileUpdateComponent implements OnInit {
  userProfileForm: FormGroup;
  userId!: string;
  profileForm: any;

  constructor(private fb: FormBuilder, private userProfileService: UserProfileService,private authService: AuthService) {
    this.userProfileForm = this.fb.group({
      userId: [{ value: '', disabled: true }, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: [''],
      gender: ['Other'],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      specialization: [''],
      medicalLicenseNumber: [''],
      qualifications: [''],
      yearsOfExperience: [''],
      hospitalAffiliation: [''],
      address: ['', Validators.required],
      profilePicture: [''],
      userType: ['Doctor']
    });
  }

  ngOnInit(): void {

    this.userId = this.authService.getUserIdFromToken() ?? '';
    this.profileForm.patchValue({ userId: this.userId });

    if (this.userId) {
      this.loadUserProfile();
    } else {
      console.error('User ID could not be retrieved from token.');
    }
  }

  loadUserProfile(): void {
    const userId = this.authService.getUserIdFromToken();
    this.userProfileService.getUserProfile(userId!).subscribe(
      profile => this.userProfileForm.patchValue(profile),
      error => console.error('Error loading user profile', error)
    );
  }

  onSubmit(): void {
    if (this.userProfileForm.valid) {
      this.userProfileService.createOrUpdateUserProfile(this.userProfileForm.value).subscribe(
        response => console.log('Profile updated successfully', response),
        error => console.error('Error updating profile', error)
      );
    }
  }

  // onSubmit(): void {
  //   if (this.userProfileForm.valid) {
  //     this.userProfileService.updateUserProfile(this.userProfileForm.value).subscribe(
  //       (response) => {
  //         console.log('Profile updated successfully', response);
  //       },
  //       (error) => {
  //         console.error('Error updating profile', error);
  //       }
  //     );
  //   }
  // }
}
