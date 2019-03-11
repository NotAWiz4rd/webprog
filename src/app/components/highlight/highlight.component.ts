import {Component, Input, OnInit} from '@angular/core';
import {MovieData} from "../../util/MovieData";
import {NavigationService} from "../../services/navigation.service";
import {LanguageService} from "../../services/language.service";
import {Globals} from "../../util/Globals";

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.css']
})
export class HighlightComponent implements OnInit {
  @Input()
  movie: MovieData = new MovieData();

  // this can't be a const as it has to be accessed from the template
  THUMBNAILS_PATH = '../../../assets/thumbnails/';

  constructor(public languageService: LanguageService,
              public globals: Globals,
              private navigationService: NavigationService) {
  }

  ngOnInit() {

  }

  navigateToMovie() {
    this.navigationService.navigateToMovie(this.movie.filename)
  }
}
