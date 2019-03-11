import {StaticText} from "./StaticText";
import {MovieData} from "./MovieData";

export class Globals {
  staticTexts: StaticText[] = [];
  movieData: MovieData[] = [];
  view: string = 'login';
  genreFilter: string = '';
  filter: string = '';
}
