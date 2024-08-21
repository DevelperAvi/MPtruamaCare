// main.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

// Check if the application is in production mode
if (environment.production) {
  enableProdMode();
}

// Bootstrap the Angular application
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
