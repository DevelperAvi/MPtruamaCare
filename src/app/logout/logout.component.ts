import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authService.setAuthState(false); // Notify any subscribers about authentication state change
    this.router.navigate(['/login']);
  }
}
