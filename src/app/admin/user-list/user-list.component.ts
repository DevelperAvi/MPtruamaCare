import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserProfileService } from '../../service/user-profile.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserProfileService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error loading users', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error loading users. Please try again.'
        });
      }
    );
  }

  editUser(userId: string) {
    this.router.navigate([`/updateProfile/${userId}`]);
  }
}
