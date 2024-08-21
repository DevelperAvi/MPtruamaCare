import { Component } from '@angular/core';
import { APP_NAME } from '../shared/constants';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
appName =  APP_NAME
}
