import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatProgressSpinnerModule,  MatChipsModule, MatIconModule, MatInputModule,
  MatListModule, MatCardModule, MatTableModule } from '@angular/material';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';
import { MoviesService} from './services/movies.service';
import { CommonService} from './services/common.service';
import { AppRoutingModule } from './app-routing.module';
import { MovieServiceAvailabilityComponent } from './components/movie-service-availability/movie-service-availability.component';
import { HttpHeaderService } from './services/httpHeader.service';
import { InitTokenService } from './services/tokenAuthentication.service';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieComponent,
    MovieServiceAvailabilityComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    AppRoutingModule
  ],
  providers: [MoviesService, CommonService, HttpHeaderService, InitTokenService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
