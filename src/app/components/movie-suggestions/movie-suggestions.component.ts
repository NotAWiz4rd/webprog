import {Component, Input, OnInit} from '@angular/core';
import {MovieData} from "../../util/MovieData";
import {Globals} from "../../util/Globals";
import {LanguageService} from "../../services/language.service";
import {MoviesService} from "../../services/movies.service";

@Component({
  selector: 'app-movie-suggestions',
  templateUrl: './movie-suggestions.component.html',
  styleUrls: ['./movie-suggestions.component.css']
})
export class MovieSuggestionsComponent implements OnInit {
  suggestedMovies: MovieData[] = [];

  constructor(public globals: Globals,
              public languageService: LanguageService,
              private moviesService: MoviesService) {
    this.suggestedMovies = this.moviesService.compileMovieSuggestions(this.globals.currentUser.watchedList);
  }

  ngOnInit() {
  }

}
