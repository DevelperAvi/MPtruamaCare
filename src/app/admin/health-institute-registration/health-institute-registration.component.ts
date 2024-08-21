import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MasterService } from '../../service/masterService';

@Component({
  selector: 'app-health-institute-registration',
  templateUrl: './health-institute-registration.component.html',
  styleUrls: ['./health-institute-registration.component.css']
})
export class HealthInstituteRegistrationComponent implements OnInit {

  healthInstituteForm!: FormGroup;
  submitted = false;

  states: any[] = [];
  districts: any[] = [];
  policeStations: any[] = [];
  instituteTypes: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService
  ) { }

  ngOnInit(): void {
    this.healthInstituteForm = this.formBuilder.group({
      healthInstituteName: ['', Validators.required],
      healthInstituteAddress: ['', Validators.required],
      healthInstituteContactNo: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      healthInstituteContactPerson: ['', Validators.required],
      healthInstituteEmailID: ['', [Validators.required, Validators.email]],
      state: ['', [Validators.required, this.defaultValidator]],
      district: ['', [Validators.required, this.defaultValidator]],
      policeStation: ['', [Validators.required, this.defaultValidator]],
      instituteType: ['', [Validators.required, this.defaultValidator]]
    });

    this.loadStates();
    this.fetchInstituteTypes();
  }

  get f() { return this.healthInstituteForm.controls; }

  loadStates(): void {
    this.masterService.getStates()
      .subscribe(
        (response: any) => {
          if (response && response.status && Array.isArray(response.response)) {
            this.states = response.response;
          } else {
            console.error('Unexpected response format', response);
          }
        },
        (error) => {
          console.error('Error fetching states:', error);
        }
      );
  }

  fetchInstituteTypes() {
    this.masterService.getHType().subscribe(
      (response: any) => {
        if (response && response.status && Array.isArray(response.response)) {
          this.instituteTypes = response.response;
        } else {
          console.error('Unexpected response format', response);
        }
      },
      error => {
        console.error('Error fetching health institute types', error);
      }
    );
  }

  onStateChange() {
    const selectedState = this.healthInstituteForm.get('state')?.value;
    if (selectedState) {
      this.masterService.getDistrictById(selectedState).subscribe(
        (data: any[]) => {
          this.districts = data;
        },
        error => {
          console.error('Error fetching districts', error);
        }
      );
    } else {
      this.districts = [];
    }
  }

  onDistrictChange() {
    const selectedState = this.healthInstituteForm.get('state')?.value;
    const selectedDistrict = this.healthInstituteForm.get('district')?.value;
    if (selectedDistrict && selectedState) {
      this.masterService.getPoliceStationByScodeDcode(selectedState, selectedDistrict).subscribe(
        (response: any) => {
          if (response && response.status && Array.isArray(response.response)) {
            this.policeStations = response.response;
          } else {
            console.error('Unexpected response format', response);
          }
        },
        error => {
          console.error('Error fetching police stations', error);
        }
      );
    } else {
      this.policeStations = [];
    }
  }

  defaultValidator(control: any): { [key: string]: boolean } | null {
    return control.value === '' ? { 'default': true } : null;
  }

  onSubmit() {
    this.submitted = true;
    if (this.healthInstituteForm.valid) {
      const formData = this.healthInstituteForm.value;
      console.log(formData)
      this.masterService.createHealthInstitute(formData).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Health Institute created successfully!',
          }).then(() => {
            this.onReset(); // Reset form after successful submission
          });
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was an error creating the health institute.',
          });
          console.error('Error creating health institute', error);
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Form',
        text: 'Please correct the errors in the form before submitting.',
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.healthInstituteForm.reset();
    this.districts = [];
    this.policeStations = [];
  }
}
