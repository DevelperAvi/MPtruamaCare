import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router if needed

@Component({
  selector: 'app-carousel',
  standalone:true,
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor(private router: Router) { } // Inject Router if needed

  ngOnInit(): void {
  }

  // Example function to prevent default action on carousel control click
  preventDefault(event: Event): void {
    event.preventDefault();
    // Optionally handle navigation programmatically
    // this.router.navigate(['/']);
  }
}
