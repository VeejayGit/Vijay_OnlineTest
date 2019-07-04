import { Component, OnInit, Input } from '@angular/core';

import { MovieLoadStatus } from '../../models/movieLoadStatus';
import { MovieLoadingStatus } from '../../models/movieLoadingStatus';

@Component({
  selector: 'app-movie-service-availability',
  templateUrl: './movie-service-availability.component.html',
  styleUrls: ['./movie-service-availability.component.scss']
})
export class MovieServiceAvailabilityComponent implements OnInit {

  @Input() services: MovieLoadingStatus[];

  constructor() { }

  ngOnInit() {
  }

  /**
   * Get boolean determining what movie service load status should be rendered
   * @param cinemaWorldLoadStatus {number}
   * @param movieLoadingStatus {MovieLoadingStatus}
   * @public
   */
  public movieLoadStatusVisible(movieLoadingStatus: MovieLoadingStatus, cinemaWorldLoadStatus: number): boolean {
    return cinemaWorldLoadStatus === movieLoadingStatus.Status;
  }
}
