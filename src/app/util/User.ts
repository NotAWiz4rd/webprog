import {WatchedMovie} from "./WatchedMovie";

export class User {
  _id: number = 0;
  email: string = '';
  password: string = '';
  isAdmin: boolean = false;
  language: number = 0;
  movieList: string[] = [];
  watchedList: WatchedMovie[] = [];
}
