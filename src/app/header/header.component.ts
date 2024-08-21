import { Component } from '@angular/core';
import { APP_NAME, APP_NAME_hi } from '../shared/constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  appName = APP_NAME;
  appNameHi=APP_NAME_hi;

}
