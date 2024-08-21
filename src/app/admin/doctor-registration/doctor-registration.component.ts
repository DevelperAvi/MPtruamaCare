import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MasterService } from '../../service/masterService';
import { response } from 'express';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.css']
})
export class DoctorRegistrationComponent implements OnInit {
  doctorForm!: FormGroup;
  selectedFile: File | null = null;
  submitted = false;

  constructor(private fb: FormBuilder
    , private http: HttpClient
    , private masterService: MasterService) { }

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      specialization: ['', Validators.required],
      qualification: ['', Validators.required],
      address: ['', Validators.required],
      userType: ['', Validators.required]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.doctorForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please fill in all required fields.'
      });
      return;
    }

    const formData: FormData = new FormData();
    formData.append('email', this.doctorForm.get('email')!.value);
    formData.append('firstName', this.doctorForm.get('firstName')!.value);
    formData.append('lastName', this.doctorForm.get('lastName')!.value);
    formData.append('gender', this.doctorForm.get('gender')!.value);
    formData.append('dateOfBirth', this.doctorForm.get('dateOfBirth')!.value);
    formData.append('phoneNumber', this.doctorForm.get('phoneNumber')!.value);
    formData.append('specialization', this.doctorForm.get('specialization')!.value);
    formData.append('qualification', this.doctorForm.get('qualification')!.value);
    formData.append('address', this.doctorForm.get('address')!.value);

    formData.append('userType', this.doctorForm.get('userType')!.value);


    this.masterService.registerDoctor(formData).subscribe(
      response => {
        console.log('Doctor registered successfully', response);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Doctor registered successfully.'
        });
      },
      error => {
        console.error('Error registering doctor', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error registering the doctor. Please try again.'
        });
      }
    )
  }
}
