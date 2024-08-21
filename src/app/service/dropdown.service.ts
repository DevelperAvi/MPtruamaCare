import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MasterService } from './masterService';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  private apiUrl = 'http://localhost:5063/api/master'; // Adjust this to your API URL
  private apiUrld = 'http://localhost:5063/api/Patient'; // Adjust this to your API URL

  constructor(private http: HttpClient, private masterService: MasterService) { }

  gender(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getDistrictStateId/${id}`)
  }

  ptConditon(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getDistrictStateId/${id}`)
  }
  typeofInjury(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getDistrictStateId/${id}`)
  }

  getDistrict(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getDistrictStateId/${id}`)
  }

  getHelthInstituteType():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/getHealthInstituteTypes`)
  }

  getMedicalOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetMedicalEmrg`);
  }

  getPatientCondition(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getPatientCondition`);
  }

  getTypeOfinjury(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getTypeOfinjury`);
  }
  getAllcaseCatogary(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetAllcaseCatogary`);
  }

  getGender(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getGender`);
  }

  getSubCat(id:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrld}/subcategories/${id}`);
  }

}
