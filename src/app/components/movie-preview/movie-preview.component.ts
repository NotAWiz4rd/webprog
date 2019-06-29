import {Component, Input, OnInit} from '@angular/core';
import {NavigationService} from "../../services/navigation.service";
import {LanguageService} from "../../services/language.service";
import {Globals} from "../../util/Globals";
import {MovieData} from "../../util/MovieData";
import {UsersService} from "../../services/users.service";
import {SeriesData} from "../../util/SeriesData";
import {MoviesService} from "../../services/movies.service";

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.css']
})
export class MoviePreviewComponent implements OnInit {
  // this can't be a const as it has to be accessed from the template
  THUMBNAILS_PATH = '../../../assets/thumbnails/';
  hover: boolean = false;
  info: boolean = false;

  @Input()
  movie: MovieData = new MovieData();

  constructor(public languageService: LanguageService,
              public globals: Globals,
              private navigationService: NavigationService,
              private usersService: UsersService) {
  }

  ngOnInit() {
  }

  navigateToMovie(movieFilename: string) {
    if (this.movie.isSeries) {
      this.navigateToSeries();
    } else {
      this.navigationService.navigateToMovie(movieFilename);
    }
  }

  addMovieToList() {
    this.usersService.addMovieToList(this.movie);
  }

  movieIsInList(): boolean {
    return this.globals.currentUser.movieList.includes(this.movie.filename);
  }

  removeMovieFromList() {
    this.usersService.removeMovieFromList(this.movie);
  }

  mouseEnter(div: string) {
    this.hover = true;
  }

  mouseLeave(div: string) {
    this.hover = false;
    this.info = false;
  }

  toggleInfo() {
    this.info = !(this.info);
  }

  navigateToSeries() {
    let series: SeriesData = this.movie as SeriesData;
    let watchedSeries = this.usersService.getWatchedMovie(series.filename);
    if (watchedSeries.info != '') {
      this.navigateToEpisode(watchedSeries.info);
    }

    let firstSeason = series.seasons[0];
    this.navigationService.navigateToEpisode(series.filename, firstSeason.key, firstSeason.episodes[0].filename);
  }

  private navigateToEpisode(info: string) {
    let infos = info.split(';');
    if (infos.length < 2) {
      console.log('WatchedList contained not enough info to navigate to episode - data might be corrupt.');
      return;
    }

    let seasonKey = infos[0];
    let episode = infos[1];
    this.navigationService.navigateToEpisode(this.movie.filename, seasonKey, episode);
  }
}
