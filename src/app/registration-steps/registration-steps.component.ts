// registration-steps.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-registration-steps',
  templateUrl: './registration-steps.component.html',
  styleUrls: ['./registration-steps.component.css']
})
export class RegistrationStepsComponent {
  steps = [
    { label: 'Personal Info', content: 'Provide your personal information.' },
    { label: 'Address Details', content: 'Enter your address details.' },
    { label: 'Payment Info', content: 'Provide payment information.' },
    { label: 'Confirmation', content: 'Review and confirm your details.' }
  ];


  currentStep = 0;

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }
}
