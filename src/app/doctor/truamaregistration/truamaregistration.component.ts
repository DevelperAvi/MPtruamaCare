import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropdownService } from '../../service/dropdown.service';
import { SitemapService } from '../../service/sitemap.service';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-truamaregistration',
  templateUrl: './truamaregistration.component.html',
  styleUrls: ['./truamaregistration.component.css']
})
export class TraumaRegisterFormComponent implements OnInit {
  traumaForm!: FormGroup;

  medicalOptions: { id: number, name: string }[] = [];
  SubmedicalOptions: { subId: number, name: string }[] = [];
  selectedMedicalOptions = new Map<number, string>();

  doctorDetails: any = {};
  loading = true;
  error: string | null = null;
  currentUser: any;
  districts: any[] = [];
  facility: any[] = [];
  PatientCondition: any[] = [];
  TypeInjury: any[] = [];
  CaseCat: any[] = [];
  Gender: any[] = [];
  SubCat: any[] = [];


  constructor(

    private fb: FormBuilder,
    private doctorService: SitemapService,
    private apiService: DropdownService,
    private authService: AuthService
  ) {
    this.traumaForm = this.fb.group({
      name: ['', Validators.required],
      gender: [0, Validators.required],
      reportingDate: ['', Validators.required],
      category: ['', Validators.required],
      medicalEmergencyType: ['', Validators.required],
      medicalEmergencySubType: [[], Validators.required],
      subCategory: [''],  // Added subCategory control

      districtName: [0, Validators.required],
      facilityType: [0, Validators.required],
      isHospitalize: ['', Validators.required],
      patientCondition: [0, Validators.required],
      typeOfInjuries: [0, Validators.required],
      ageYears: ['', Validators.required],
      ageMonths: ['', Validators.required],
      ageDays: ['', Validators.required],
      transferMode: ["", Validators.required],
      isReportedInIRAD: ['', Validators.required],
      medicalEmergencySubTypes: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.traumaForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      reportingDate: ['', Validators.required],
      districtName: [{ value: '', disabled: true }],
      facilityType: [{ value: '', disabled: true }],
      category: [null, Validators.required],
      isHospitalize: ['', Validators.required],
      patientCondition: ['', Validators.required],
      typeOfInjuries: ['', Validators.required],
      ageYears: [0, Validators.required],
      ageMonths: [0],
      ageDays: [0],
      medical: [null],
      medicalEmergencyType: [null],
      transferMode: ['', Validators.required],
      isReportedInIRAD: ['', Validators.required],
    });
    this.traumaForm.get('transferMode')?.setValue("");
    const userId = this.authService.getCurrentUser();
    this.loadDoctorDetails(userId);
  }

  loadGender(): void {
    this.apiService.getGender().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.response)) {
          this.Gender = response.response;
          this.traumaForm.get('gender')?.setValue("");
        } else {
          console.error('Response is not an array or empty:', response);

          this.traumaForm.get('gender')?.setValue("");
        }
      }
    )
  }

  loadCaseCatagory(): void {
    this.apiService.getAllcaseCatogary().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.response)) {
          // Add the default option to the beginning of the CaseCat array
          this.CaseCat = response.response;

          // Set default value in the form control if necessary
          this.traumaForm.get('category')?.setValue(""); // Default value for category
        } else {
          console.error('Response is not an array or empty:', response);
          // Set default option and form value if the response is not as expected

          this.traumaForm.get('category')?.setValue("");
        }
      },
      (error) => {
        console.error('Error loading case categories', error);
        // Handle error: set default option and form value

        this.traumaForm.get('category')?.setValue("");
      }
    );
  }

  loadTypeOfinjury(): void {
    this.apiService.getTypeOfinjury().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.response)) {
          this.TypeInjury = response.response;
          this.traumaForm.get('typeOfInjuries')?.setValue(""); // Default value
        } else {
          console.error('Response is not an array or is empty:', response);

          this.traumaForm.get('typeOfInjuries')?.setValue(""); // Default value
        }
      },
      (error) => {
        console.error('Error loading type of injuries', error);

        this.traumaForm.get('typeOfInjuries')?.setValue(""); // Default value
      }
    );
  }

  loadPatientCondition(): void {
    this.apiService.getPatientCondition().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.response)) {
          this.PatientCondition = response.response;
          this.traumaForm.get('patientCondition')?.setValue(""); // Default value
        } else {
          console.error('Response is not an array or is empty:', response);

          this.traumaForm.get('patientCondition')?.setValue(""); // Default value
        }
      },
      (error) => {
        console.error('Error loading patient conditions', error);

        this.traumaForm.get('patientCondition')?.setValue(""); // Default value
      }
    );
  }


  loadInstituteType(): void {
    this.apiService.getHelthInstituteType().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.response)) {
          this.facility = response.response;

          // Handle setting the default value based on doctorDetails
          if (this.facility.length && this.doctorDetails) {
            const selectedFacility = this.facility.find(f => f.healthInstituteTypeID === this.doctorDetails.healthInstituteTypeID);
            if (selectedFacility) {
              this.traumaForm.get('facilityType')?.setValue(selectedFacility.healthInstituteTypeID);
            } else {
              this.traumaForm.get('facilityType')?.setValue(""); // Default value if no match found
            }
          } else {
            this.traumaForm.get('facilityType')?.setValue(""); // Default value if no facilities or no doctorDetails
          }
        } else {
          console.error('Response is not an array or is empty:', response);

          this.traumaForm.get('facilityType')?.setValue(""); // Default value
        }
      },
      (error) => {
        console.error('Error loading facility types', error);

        this.traumaForm.get('facilityType')?.setValue(""); // Default value
      }
    );
  }

  loadDistrict(stateId: string): void {
    this.apiService.getDistrict(stateId).subscribe(
      (response: any) => {
        if (response && Array.isArray(response)) {
          // Add the default option to the beginning of the districts array
          this.districts = response;
          const selectedDistrict = this.districts.find(d => d.dCode === this.doctorDetails?.healthInstituteDCode);
          if (selectedDistrict) {
            this.traumaForm.get('districtName')?.setValue(selectedDistrict.dCode);
          } else {
            this.traumaForm.get('districtName')?.setValue("");
          }
        } else {
          console.error('Response is not an array or empty:', response);
          this.traumaForm.get('districtName')?.setValue("");
        }
      },
      (error) => {
        console.error('Error loading districts', error);
        // Handle error: set default option and form value
        this.districts = [{ dCode: '0', dName: '- Select -' }];
        this.traumaForm.get('districtName')?.setValue("");
      }
    );
  }

  loadDoctorDetails(userId: any): void {
    this.loading = true;
    this.doctorService.getDoctorDetailMore(userId.nameid).subscribe(
      response => {
        this.doctorDetails = response.response;
        this.loading = false;

        this.loadDistrict('23'); // Replace '23' with the actual state ID if needed
        this.loadInstituteType();
        this.loadPatientCondition();
        this.loadTypeOfinjury();
        this.loadCaseCatagory();
        this.loadGender();
      },
      error => {
        console.error('Error fetching doctor details', error);
        this.error = 'Unable to load doctor details. Please try again later.';
        this.loading = false;
      }
    );
  }

  onCategoryChange(): void {
    const category = this.traumaForm.get('category')?.value;
    if (category === '4') {
      this.apiService.getMedicalOptions().subscribe(
        (response: any) => {
          if (response && Array.isArray(response.response)) {
            this.medicalOptions = response.response;
          } else {
            console.error('Response is not an array:', response);
          }
        },
        error => console.error('Error fetching medical options:', error)
      );
    } else {
      this.traumaForm.get('medicalEmergencyType')?.setValue(null);
      this.traumaForm.get('medicalEmergencySubType')?.setValue([]);
      this.selectedMedicalOptions.clear();
    }
  }

  onMedicalChangetSubcat(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedId = parseInt(target.value, 10);

    if (!isNaN(selectedId)) {
      this.apiService.getSubCat(selectedId).subscribe(
        (response: any) => {
          if (response && Array.isArray(response.response)) {
            this.SubmedicalOptions = response.response;
            console.log('medical option', this.SubmedicalOptions)
          } else {
            console.error('Response is not an array or empty:', response.response);
          }
        },
        error => console.error('Error fetching submedical options:', error)
      );
    }
  }

  onMedicalChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOptions = Array.from(selectElement.selectedOptions);

    const selectedIds = selectedOptions
      .map(option => parseInt(option.value, 10))
      .filter(id => !isNaN(id));

    selectedIds.forEach(id => {
      const subOption = this.SubmedicalOptions.find(option => option.subId === id);
      if (subOption && !this.selectedMedicalOptions.has(id)) {
        this.selectedMedicalOptions.set(id, subOption.name);
      }
    });

    this.updateSelectedOptionsInForm();
  }

  removeOption(id: number): void {
    this.selectedMedicalOptions.delete(id);
    this.updateSelectedOptionsInForm();
  }

  private updateSelectedOptionsInForm(): void {
    this.traumaForm.get('medicalEmergencySubType')?.setValue(Array.from(this.selectedMedicalOptions.keys()));

  }

  get selectedMedicalOptionsArray() {
    return Array.from(this.selectedMedicalOptions.entries()).map(([id, name]) => ({ id, name }));
  }

  onSubmit() {
    this.traumaForm.markAllAsTouched();
    if (this.traumaForm.invalid) {
      console.log("Form is invalid");
      return;
    }
    else{
      const formData = this.traumaForm.value;

      const selectedMedicalOptions = this.selectedMedicalOptionsArray.map(option => ({
        id: option.id,
        name: option.name
      }));

      formData.medicalEmergencySubType = selectedMedicalOptions;
      console.log(formData)
    }
    console.log("Form is valid", this.traumaForm.value);
  }
}
