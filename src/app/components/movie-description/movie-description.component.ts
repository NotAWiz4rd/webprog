import {Component, Input, OnInit} from '@angular/core';
import {LanguageService} from "../../services/language.service";
import {Globals} from "../../util/Globals";
import {MovieData} from "../../util/MovieData";

@Component({
  selector: 'app-movie-description',
  templateUrl: './movie-description.component.html',
  styleUrls: ['./movie-description.component.css']
})

export class MovieDescriptionComponent implements OnInit {

  @Input()
  movie: MovieData = new MovieData();

  constructor(public languageService: LanguageService,
              public globals: Globals) {
  }

  ngOnInit() {
  }

}
