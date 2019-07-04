import { MovieDetails } from '../models/movieDetails';
export class Movie {
    Title: string;
    Year: string;
    ID: string;
    Type: string;
    Poster: string;
    CinemaWorldId: string;
    FilmWorldId: string;
    Price: string;
    Details: MovieDetails;
    BadImage: boolean;

    constructor(title: string, price: string) {
        this.Title = title;
        this.Price = price;
    }
}
