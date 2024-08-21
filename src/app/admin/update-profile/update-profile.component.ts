import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserProfileService } from '../../service/user-profile.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html'
})
export class UpdateProfileComponent implements OnInit {
  userId: string | null = null;
  user: any = {};

  constructor(private userService: UserProfileService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      if (this.userId) {
        this.loadUser();
      }
    });
  }

  loadUser() {
    this.userService.getUserProfile(this.userId!).subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.error('Error loading user', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error loading the user profile. Please try again.'
        });
      }
    );
  }

  updateUser() {
    this.userService.updateUserProfile(this.userId!, this.user).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User profile updated successfully.'
        }).then(() => {
          this.router.navigate(['/user-list']);
        });
      },
      error => {
        console.error('Error updating user', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error updating the user profile. Please try again.'
        });
      }
    );
  }
}
