// master.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { HealthInstitute } from '../admin/models/health-institute.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {


  private apiUrl = 'http://localhost:5063/api'; // Update with your API URL
  private apiUrlD = 'http://localhost:5063/api/Doctor/register'; // Update with your API URL

  constructor(private http: HttpClient) { }

  getStates(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/master/getStates`);
  }

  getHType(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/master/getHealthInstituteTypes`);
  }

  createHealthInstitute(healthInstitute: HealthInstitute): Observable<any> {
    console.log(healthInstitute)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
      })
    };
    return this.http.post<any>(`${this.apiUrl}/HealthInstitute/CreateInstitute`, healthInstitute,httpOptions);
  }

  getDistrictById(id: number): Observable<any> {
    // Correct URL structure to match the endpoint
    return this.http.get(`${this.apiUrl}/master/getDistrictStateId/${id}`);
  }

  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    throw error; // Throw the error for the component to handle
  }

  getPoliceStations(districtId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/police-stations?districtId=${districtId}`);
  }

  getPoliceStationByScodeDcode(scode:number,dcode:number):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/master/getPoliceStationByScodeDcode?scode=${scode}&dcode=${dcode}`);
  }

  registerDoctor(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrlD, formData);
  }


  getHealthInstitutesByDistrict(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/HealthInstitute/getAllinstitute`);
  }

  getUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Doctor/getAllUser`);
  }

  assignInstitute(assignment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/InstituteAssigned/assign`, assignment);
  }


}
