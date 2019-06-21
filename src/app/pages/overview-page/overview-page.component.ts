import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MovieData} from "../../util/MovieData";
import {Globals} from "../../util/Globals";
import {LanguageService} from "../../services/language.service";
import {MoviesService} from "../../services/movies.service";
import {SeriesData} from "../../util/SeriesData";

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
    this.loadMoviesAndSeries();
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

  loadMoviesAndSeries() {
    // load file with movie data - reload this every time, in case the movies have changed
    this.http.get(MOVIEDATA_PATH)
      .subscribe(data => {
        this.globals.movieData = [];
        this.globals.seriesData = [];
        const array = data as Object[];
        array.forEach(dataObject => {
          let movie = dataObject as MovieData;
          if (movie.isSeries) {
            this.globals.seriesData.push(dataObject as SeriesData);
          } else {
            this.globals.movieData.push(dataObject as MovieData);
          }
        });
        console.log('Loaded movies and series data.');
      });
  }

  resetFilters() {
    this.genreFilterChange('');
    this.filterInputChange('');
  }
}
