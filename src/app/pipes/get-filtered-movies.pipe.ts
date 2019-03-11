import {Pipe, PipeTransform} from "@angular/core";
import {MovieData} from "../util/MovieData";

@Pipe({
  name: 'getFilteredMovies'
})
export class GetFilteredMoviesPipe implements PipeTransform {
  transform(movies: MovieData[], filter: string): MovieData[] {
    if (!movies) {
      return [];
    }

    if (!filter || filter === '') {
      return movies;
    }

    let filteredMovies: MovieData[] = [];

    // For every added language, the description of that respective language must be included here.
    movies.forEach(movie => {
      if (movie.name.toLowerCase().includes(filter.toLowerCase())) {
        filteredMovies.push(movie);
      } else if (movie.tags.includes(filter.toLowerCase())) {
        filteredMovies.push(movie);
      } else if (movie.director.toLowerCase().includes(filter.toLowerCase())) {
        filteredMovies.push(movie);
      } else if (movie.description.toLowerCase().includes(filter.toLowerCase())) {
        filteredMovies.push(movie);
      } else if (movie.descriptionGerman.toLowerCase().includes(filter.toLowerCase())) {
        filteredMovies.push(movie);
      } else if (movie.descriptionSpanish.toLowerCase().includes(filter.toLowerCase())) {
        filteredMovies.push(movie);
      }
    });

    return filteredMovies;
  }
}
