import {Pipe, PipeTransform} from "@angular/core";
import {Language} from "../util/Language";
import {MovieData} from "../util/MovieData";

@Pipe({
  name: 'getMovieDescription'
})
export class GetMovieDescriptionPipe implements PipeTransform {
  transform(movie: MovieData, language: Language): string {
    if (!movie) {
      return '';
    }

    let description = '';

    switch (String(language)) {
      case '0':
        description = movie.description;
        break;
      case '1':
        description = movie.descriptionGerman;
        break;
      case '2':
        description = movie.descriptionSpanish;
        break;
      default:
        description = movie.description;
        break;
    }
    return description;
  }
}
