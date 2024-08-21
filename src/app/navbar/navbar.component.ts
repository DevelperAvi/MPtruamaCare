import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MenuItem } from '../service/models/response.model'; // Adjust the path as necessary
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() menuItems: MenuItem[] = [];
  @Input() isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['menuItems']) {
    }
    if (changes['isAuthenticated']) {
    }
  }

  logout(): void {
    this.authService.logout();
    console.log('Logged out successfully');
    // Navigate to login or home page after logout
    this.router.navigate(['/login']);
  }

}
