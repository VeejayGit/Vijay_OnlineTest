import { CommonService } from './common.service';
import { Movie } from '../models/movie';

describe('ValueService', () => {
    let service: CommonService;
    const movieArray: Movie[] = [
        new Movie('Test Movie 1', '1'),
        new Movie('Test Movie 1', '2')
     ];
    beforeEach(() => { service = new CommonService(); });

    it('#arrayUnique remove duplicate movies', () => {
      expect(service.arrayUnique(movieArray).length).toBe(1);
    });

    it('#arrayUnique should retain same number of movies if no duplicates', () => {
        movieArray[1].Title = 'Test Movie 2';
        expect(service.arrayUnique(movieArray).length).toBe(2);
    });
  });
