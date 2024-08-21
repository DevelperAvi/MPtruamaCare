import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { District } from '../models/district.model';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  private apiUrl = 'http://localhost:5063/api/district';

  constructor(private http: HttpClient) { }

  getDistrict(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createDistrict(district: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, district);
  }

  updateDistrict(id: number, district: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, district);
  }

  getDistrictsByState(sCode: string): Observable<District[]> {
    const url = `${this.apiUrl}/getDistrictbystate/${sCode}`;
    return this.http.get<District[]>(url);
  }
}
