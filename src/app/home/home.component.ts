import { Component } from '@angular/core';
import { CarouselComponent } from "../carousel/carousel.component";
import { RegistrationStepsModule } from '../registration-steps/registration-steps.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent,RegistrationStepsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
