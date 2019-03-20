import {Injectable} from "@angular/core";
import {Globals} from "../util/Globals";
import {User} from "../util/User";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MovieData} from "../util/MovieData";
import {WatchedMovie} from "../util/WatchedMovie";

const DATABASE_PATH = 'https://api.mlab.com/api/1/databases/moviehub-users/collections/users?apiKey=06Yem6JpYP8TSlm48U-Ze0Tb49Gnu0NA';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class UsersService {
  constructor(private globals: Globals,
              private http: HttpClient) {
  }

  loadUsersFromServer() {
    return this.http.get(DATABASE_PATH)
      .subscribe(data => {
        const userData = data as User[];
        console.log('Loaded user data.');
        this.globals.userData = userData;
      });
  }

  addUser(newUser: User): boolean {
    let success = true;

    this.globals.userData.forEach(user => {
      if (user.name === newUser.name) {
        success = false;
        console.log('User already exists - aborted creation.')
      }
    });

    if (!success) {
      return false;
    }

    newUser._id = this.globals.userData.length;

    this.http.post(DATABASE_PATH, JSON.stringify(newUser), httpOptions).subscribe(data => {
      console.log('New user has been created:');
      console.log(data);
      success = true;
      this.loadUsersFromServer();
    });
    return success;
  }

  addMovieToList(movie: MovieData) {
    this.globals.currentUser.movieList.push(movie.filename);
    this.pushUserUpdate();

  }

  removeMovieFromList(movie: MovieData) {
    let index = this.globals.currentUser.movieList.indexOf(movie.filename);
    this.globals.currentUser.movieList.splice(index, 1);
    this.pushUserUpdate();
  }

  private pushUserUpdate() {
    this.http.post(DATABASE_PATH, JSON.stringify(this.globals.currentUser), httpOptions).subscribe(data => {
      console.log('Userdata has been updated: ');
      console.log(data);
    });
  }

  getUser(username: string): User {
    let userFound = new User();
    this.globals.userData.forEach(user => {
      if (user.name === username) {
        userFound = user;
      }
    });
    return userFound;
  }

  addMovieToWatched(movie: WatchedMovie) {
    let movieExisted = false;
    this.globals.currentUser.watchedList.forEach(watchedMovie => {
      if (watchedMovie.movieName === movie.movieName) {
        watchedMovie.timestamp = movie.timestamp;
        movieExisted = true;
      }
    });
    if (!movieExisted) {
      this.globals.currentUser.watchedList.push(movie);
    }
    this.pushUserUpdate();
  }

  getWatchedMovie(moviename: string): WatchedMovie {
    let movie = new WatchedMovie();
    movie.timestamp = 0;
    this.globals.currentUser.watchedList.forEach(watchedMovie => {
      if (watchedMovie.movieName === moviename) {
        movie = watchedMovie;
      }
    });
    return movie;
  }
}
