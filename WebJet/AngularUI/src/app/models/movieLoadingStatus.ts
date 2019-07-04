import { MovieLoadStatus } from '../models/movieLoadStatus';
export class MovieLoadingStatus {
    Title: string;
    Status: MovieLoadStatus;

    constructor(title: string, status: MovieLoadStatus) {
        this.Title = title;
        this.Status = status;
    }
}
