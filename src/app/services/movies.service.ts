import {Injectable} from "@angular/core";
import {MovieData} from "../util/MovieData";
import {Globals} from "../util/Globals";

@Injectable()
export class MoviesService {
  constructor(private globals: Globals) {
  }

  getMovie(movieKey: string): MovieData {
    let selectedMovie: MovieData = new MovieData();
    this.globals.movieData.forEach(movie => {
      if (movie.filename == movieKey) {
        selectedMovie = movie;
      }
    });
    return selectedMovie;
  }
}
