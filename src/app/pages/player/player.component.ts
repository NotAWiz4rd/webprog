import {Component, HostListener, OnInit} from '@angular/core';
import {LanguageService} from "../../services/language.service";
import {Globals} from "../../util/Globals";
import {NavigationService} from "../../services/navigation.service";
import {ActivatedRoute} from "@angular/router";
import {MovieData} from "../../util/MovieData";
import {UsersService} from "../../services/users.service";
import {WatchedMovie} from "../../util/WatchedMovie";

const MOVIES_PATH = '../../../assets/movies/';
const THUMBNAILS_PATH = '../../../assets/thumbnails/';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  movieSource: string = '';
  thumbnail: string = '';
  moviename: string = '';

  innerWidth: number = 0;
  innerHeight: number = 0;

  constructor(public languageService: LanguageService,
              public globals: Globals,
              private navigationService: NavigationService,
              private activatedRoute: ActivatedRoute,
              private usersService: UsersService) {
    this.activatedRoute.data.subscribe((res) => {
      let movie = res.movie as MovieData;
      this.movieSource = MOVIES_PATH + movie.filename + '.mp4';
      this.thumbnail = THUMBNAILS_PATH + movie.filename + '.jpg';
      this.moviename = movie.filename;
    });

    this.getMovieTimestamp();
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

    this.globals.view = 'watch';

    let vid = document.getElementById('myVideo');
    // @ts-ignore
    vid.currentTime = this.getMovieTimestamp();
  }

  private getMovieTimestamp(): number {
    let watchedMovie = this.usersService.getWatchedMovie(this.moviename);
    if (watchedMovie.timestamp > 10) {
      watchedMovie.timestamp -= 10;
    }
    return watchedMovie.timestamp;
  }

  goBack() {
    let watchedMovie = new WatchedMovie();
    let vid = document.getElementById('myVideo');
    watchedMovie.movieName = this.moviename;
    // @ts-ignore
    watchedMovie.timestamp = vid.currentTime;
    this.usersService.addMovieToWatched(watchedMovie);
    this.navigationService.navigateBack('overview');
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

}
