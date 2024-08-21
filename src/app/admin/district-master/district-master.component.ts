import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { District } from '../models/district.model';
import { DistrictService } from '../../service/district/district.service';
import { MasterService } from '../../service/masterService';
import { State } from '../../service/models/state.model';

@Component({
  selector: 'app-district-master',
  templateUrl: './district-master.component.html',
  styleUrls: ['./district-master.component.css']
})
export class DistrictMasterComponent implements OnInit {

  districtForm: FormGroup;
  states: State[] = [];
  isEditMode = false;
  districtId: number | null = null;
  districts: District[] = [];
  selectedStateId: number | null = null;// Initialize districts as an empty array

  constructor(
    private fb: FormBuilder,
    private districtService: DistrictService,
    private masterService: MasterService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.districtForm = this.fb.group({
      dname: ['', Validators.required],
      dcode: ['', [Validators.required, Validators.maxLength(10)]],
      stateId: [null, Validators.required],
      createUser: [''],
      updateUser: [''],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      if (id) {
        this.districtId = id;
        this.isEditMode = true;
        this.loadDistrict(id);
      }
    });

    this.loadStates();
  }

  loadDistrict(id: number): void {
    this.districtService.getDistrict(id).subscribe(
      district => {
        this.districtForm.patchValue(district);
      },
      error => {
        console.error('Error loading district:', error);
      }
    );
  }

  loadStates(): void {
    this.masterService.getStates()
      .subscribe(
        (response: any) => {
          this.states = response.response; // Assuming your GenericResponse structure is returned properly
        },
        (error) => {
          console.error('Error fetching states:', error);
          // Handle error, show error message, etc.
        }
      );
  }

  onSubmit(): void {
    if (this.districtForm.valid) {
      const district: District = this.districtForm.value;
      if (this.isEditMode) {
        this.districtService.updateDistrict(this.districtId!, district).subscribe(
          () => {
            this.router.navigate(['/admin/dashboard']);
          },
          error => {
            console.error('Error updating district:', error);
          }
        );
      } else {
        this.districtService.createDistrict(district).subscribe(
          () => {
            this.router.navigate(['/admin/dashboard']);
          },
          error => {
            console.error('Error creating district:', error);
          }
        );
      }
    }
  }

  // Method to handle change in state dropdown selection
  onStateSelectionChange(): void {
    // Implement if needed
  }

  // Method to fetch districts based on selected state
  onStateChange(): void {
    if (this.districtForm.get('stateId')!.value) {
      const selectedStateId = this.districtForm.get('stateId')!.value;
      this.districtService.getDistrictsByState(selectedStateId).subscribe(
        districts => {
          this.districts = districts;
          console.log('Districts:', districts); // Remove in production
        },
        error => {
          console.error('Error fetching districts:', error);
        }
      );
    } else {
      this.districts = []; // Clear districts if no state is selected
    }
  }
}
