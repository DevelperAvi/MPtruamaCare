import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  private apiUrl = 'http://localhost:5063/api/auth/login'; // Update this URL if necessary

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {

  }

  onSubmit() {
    this.http.post<{ token: string }>(this.apiUrl, {
      UserName: this.username,
      Password: this.password
    }).subscribe(
      response => {
        this.authService.saveToken(response.token);

        const token = this.authService.getToken();
        if (!token) {
          throw new Error('No token found');
        } else {
          try {
            // Decode the JWT token
            const decodedToken: any = jwtDecode(token);
            const role = decodedToken.role;


            if (this.authService.isTokenExpired()) {
              this.authService.logout();
              alert('Your session has expired. Please log in again.');
              this.router.navigate(['/login']);
            } else {
              switch (role) {
                case 'Admin':
                  this.router.navigate(['/admin-dashboard']);
                  break;
                case 'HOD':
                  this.router.navigate(['/hod-dashboard']);
                  break;
                case 'Doctor':
                  this.router.navigate(['/doctor-dashboard']);
                  break;
                case 'district':
                  this.router.navigate(['/district-dashboard']);
                  break;
                default:
                  this.router.navigate(['/user-dashboard']);
              }
              this.authService.setAuthState(true);
            }
          } catch (error) {
            console.error('Error decoding token', error);
            this.authService.logout();
            this.router.navigate(['/login']);
          }
        }
      },
      error => {
        alert("Server Down")
        console.error('Login failed', error);
        // Handle login error (e.g., show an error message)
      }
    );
  }
}





