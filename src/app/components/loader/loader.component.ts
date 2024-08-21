import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../../loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private loaderService: LoaderService) {
    this.isLoading$ = this.loaderService.isLoading$;
  }

  ngOnInit(): void {}
}
