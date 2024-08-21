// auth.service.ts
import { Injectable } from '@angular/core';

import jwt_decode, { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private authState = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor() { }

  // Save token to local storage
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getCurrentUser(): any {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken : null; // Adjust field names based on your token structure
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  getAuthState() {
    return this.authState.asObservable();
  }

  setAuthState(isAuthenticated: boolean): void {
    this.authState.next(isAuthenticated);
  }

  // Get token from local storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  getAuthToken(): string {
    if (this.isAuthenticated()) {
      return localStorage.getItem(this.tokenKey) || '';
    } else {

      return 'eyJhbGciOiJIUzI1NiIsInRdasfasdfasd5cCI6IkpXVCJ9.asdfadsfasd.QzJWAyl-ajjBwIBrSOPnLDoo-lhgFtqyydzGv_eU-R4'; // Replace with actual anonymous token logic
    }
  }
  // Check if the token is expired
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const decodedToken: any = jwtDecode(token);
      const expiry = decodedToken.exp;
      return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    } catch (error) {
      console.error('Error decoding token', error);
      return true;
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const exp = decodedToken.exp;
      return exp > Math.floor(Date.now() / 1000); // Check if token is expired
    }
    return false;
  }

  login(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.authState.next(this.isAuthenticated());
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.authState.next(this.isAuthenticated());
  }

  getRoles(): string[] {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.role || [];
      } catch (e) {
        return [];
      }
    }
    return [];
  }

  getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.userId;
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return null;
  }

  getUserProfile(): any {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      try {
        // Decode the token to get user profile info
        const decodedToken: any = jwtDecode(token);
        return decodedToken; // This should include user info like name, email, etc.
      } catch (e) {
        console.error('Failed to decode token', e);
        return null;
      }
    }
    return null;
  }
}
