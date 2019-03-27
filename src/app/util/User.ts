// most basic user data, corresponds to the structure in the users.json
import {WatchedMovie} from "./WatchedMovie";

export class User {
  _id: number = 0;
  name: string = '';
  password: string = '';
  email: string = '';
  movieList: string[] = [];
  watchedList: WatchedMovie[] = [];
}
