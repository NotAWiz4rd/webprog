import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MovieData} from "../../util/MovieData";
import {Globals} from "../../util/Globals";
import {LanguageService} from "../../services/language.service";
import {MoviesService} from "../../services/movies.service";

const MOVIEDATA_PATH = '../../../assets/movieData.json';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit {

  constructor(public globals: Globals,
              public languageService: LanguageService,
              private moviesService: MoviesService,
              private http: HttpClient) {
    // load file with movie data - reload this every time, in case the movies have changed
    this.http.get(MOVIEDATA_PATH)
      .subscribe(data => {
        const movieData = data as MovieData[];
        console.log('Loaded movies data.');
        this.globals.movieData = movieData;
      });
  }

  ngOnInit() {
    this.globals.view = 'overview';
  }

  genreFilterChange(genre: string) {
    this.globals.genreFilter = genre;
  }

  filterInputChange(value: string) {
    this.globals.filter = value;
  }

  getRecentlyWatched(): MovieData[] {
    return this.moviesService.getRecentlyWatchedMovies(5);
  }

  getTestMovies(): MovieData[] {
    return this.globals.movieData.slice(0, 10);
  }
}
