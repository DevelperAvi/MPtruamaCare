import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SitemapResponse } from './models/response.model'; // Adjust the path as necessary
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SitemapService {
  private apiUrl = 'http://localhost:5063/api/master/getSitemap'; // Replace with your actual API URL
  private apiUrlD = 'http://localhost:5063/api/Doctor'; // Replace with your actual API URL

  constructor(private http: HttpClient, private authService: AuthService) { }

  getSitemap(): Observable<SitemapResponse> {
    const token = this.authService.getToken(); // Assuming this method retrieves the token from local storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<SitemapResponse>(`${this.apiUrl}`, { headers });
  }

  getDoctorDetails(userId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const params = new HttpParams().set('userId', userId);

    return this.http.get<any>(`${this.apiUrlD}/getDetails`, { headers, params });
  }

   getDoctorDetailMore(userId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const params = new HttpParams().set('userId', userId);

    return this.http.get<any>(`${this.apiUrlD}/getDetailsD`, { headers, params });
  }
}
