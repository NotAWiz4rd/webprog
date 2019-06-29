import {StaticText} from "./StaticText";
import {MovieData} from "./MovieData";
import {User} from "./User";
import {SeriesData} from "./SeriesData";

export class Globals {
  staticTexts: StaticText[] = [];
  movieData: MovieData[] = [];
  seriesData: SeriesData[] = [];
  userData: User[] = [];
  view: string = 'login';
  genreFilter: string = '';
  filter: string = '';
  currentUser: User = new User();
  THUMBNAILS_PATH: string = '../../../assets/thumbnails/';
  version: string = '1.8.3';
}
