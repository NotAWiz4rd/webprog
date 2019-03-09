import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MovieData} from "../../util/MovieData";
import {LanguageService} from "../../services/language.service";
import {Globals} from "../../util/Globals";
import {NavigationService} from "../../services/navigation.service";
import {MoviesService} from "../../services/movies.service";

const MOVIEDATA_PATH = '../../../assets/movieData.json';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit {

  constructor(public languageService: LanguageService,
              public globals: Globals,
              private http: HttpClient,
              private navigationService: NavigationService,
              private moviesService: MoviesService) {
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

  navigateToMovie(movieFilename: string) {
    if (this.moviesService.movieAvailable(movieFilename)) {
      this.navigationService.navigateToMovie(movieFilename);
    }
  }
}
