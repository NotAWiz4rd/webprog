import {StaticText} from "./StaticText";
import {MovieData} from "./MovieData";
import {User} from "./User";

export class Globals {
  staticTexts: StaticText[] = [];
  movieData: MovieData[] = [];
  userData: User[] = [];
  view: string = 'login';
  genreFilter: string = '';
  filter: string = '';
  currentUser: User = new User();
  version: string = '1.6.7'
}
