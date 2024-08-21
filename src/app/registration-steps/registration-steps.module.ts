// registration-steps.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import Angular common module
import { FormsModule } from '@angular/forms';   // Import Angular forms module, if needed
import { RegistrationStepsComponent } from './registration-steps.component'; // Import your component

@NgModule({
  declarations: [
    RegistrationStepsComponent // Declare your component
  ],
  imports: [
    CommonModule,  // Import Angular modules that your component needs
    FormsModule    // Import forms module if you're using template-driven forms
  ],
  exports: [
    RegistrationStepsComponent // Export your component if it needs to be used in other modules
  ]
})
export class RegistrationStepsModule { }
