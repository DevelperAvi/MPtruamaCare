import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth/auth.service';
import { APP_NAME } from './shared/constants';
import { MenuItem } from './service/models/response.model'; // Adjust the path as necessary
import { SitemapService } from './service/sitemap.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  appName = APP_NAME;
  title = this.appName;

  isAuthenticated: boolean = false;
  menuItems: MenuItem[] = []; // Ensure this is correctly typed as MenuItem[]

  constructor(private authService: AuthService, private sitemapService: SitemapService) {}

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.authService.getAuthState().subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
      this.loadMenuItems(); // Load menu items based on authentication state
    });

    // Initial load of menu items (in case user is already authenticated)
    if (this.authService.isAuthenticated()) {
      this.loadMenuItems();
    }
  }

  loadMenuItems(): void {
    const authToken = this.authService.getAuthToken();

    this.sitemapService.getSitemap().subscribe(
      (response: any) => {
        if (response && response.result && response.result.status) {
          this.menuItems = response.response.sitemap || [];
        } else {
          this.menuItems = response.response.sitemap || [];
        }
      },
      (error) => {
        console.error('Error fetching menu items:', error);
        this.menuItems = []; // Clear menu items in case of an error
      }
    );
  }
}
