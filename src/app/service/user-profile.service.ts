import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from './models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private apiUrl = 'http://localhost:5063/api/Doctor/getAllUser'; // Adjust the URL as necessary

  constructor(private http: HttpClient) { }

  getAll(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.apiUrl);
  }



  create(userProfile: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>(this.apiUrl, userProfile);
  }

  update(id: string, userProfile: UserProfile): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, userProfile);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getUserProfile(userId: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/${userId}`);
  }

  createOrUpdateUserProfile(userProfile: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>(this.apiUrl, userProfile);
  }

  updateUserProfile(userId: string, userProfile: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiUrl}/${userId}`, userProfile);
  }

  registerDoctor(model: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/RegisterDoctor`, model);
  }
}
