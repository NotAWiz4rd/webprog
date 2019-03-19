import {Component, HostListener, OnInit} from '@angular/core';
import {LanguageService} from "../../services/language.service";
import {Globals} from "../../util/Globals";
import {NavigationService} from "../../services/navigation.service";
import {ActivatedRoute} from "@angular/router";
import {MovieData} from "../../util/MovieData";
import {UsersService} from "../../services/users.service";
import {WatchedMovie} from "../../util/WatchedMovie";
import {MoviesService} from "../../services/movies.service";
import {EpisodeData} from "../../util/EpisodeData";

const MOVIES_PATH = '../../../assets/movies/';
const THUMBNAILS_PATH = '../../../assets/thumbnails/';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  source: string = '';
  thumbnail: string = '';
  moviename: string = '';
  season: string = '';

  episode: EpisodeData = new EpisodeData();

  isSeries: boolean = false;

  // todo add controls for episode/season switching under video

  innerWidth: number = 0;
  innerHeight: number = 0;

  constructor(public languageService: LanguageService,
              public globals: Globals,
              private navigationService: NavigationService,
              private activatedRoute: ActivatedRoute,
              private usersService: UsersService,
              private moviesService: MoviesService) {
    this.activatedRoute.data.subscribe((res) => {
      let movie = res.movie as MovieData;
      this.source = MOVIES_PATH + movie.filename + '.mp4';
      this.thumbnail = THUMBNAILS_PATH + movie.filename + '.jpg';
      this.moviename = movie.filename;

      if (window.location.pathname.includes('series')) {
        this.isSeries = true;
        this.season = window.location.pathname.split('/')[4];
        let episodeKey = window.location.pathname.split('/')[5];
        this.episode = this.moviesService.getEpisode(this.moviename, this.season, episodeKey);
        this.source = MOVIES_PATH + movie.filename + '/' + this.season + '/' + this.episode.filename + '.mp4';
      }
    });
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
    if (this.isSeries) {
      watchedMovie.info = this.season + ';' + this.episode.filename;
    }
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

  goToNextEpisode() {
    let episodeDate = this.episode.nextEpisode.split('/');
    if (episodeDate.length < 2) {
      console.error('EpisdoData for next episode was faulty: ' + this.episode.nextEpisode);
    }
    this.navigationService.navigateToEpisode(this.moviename, episodeDate[0], episodeDate[1]);
  }

}
