import {Component, Input, OnInit} from '@angular/core';
import {NavigationService} from "../../services/navigation.service";
import {LanguageService} from "../../services/language.service";
import {Globals} from "../../util/Globals";
import {MovieData} from "../../util/MovieData";

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.css']
})
export class MoviePreviewComponent implements OnInit {
  // this can't be a const as it has to be accessed from the template
  THUMBNAILS_PATH = '../../../assets/thumbnails/';

  @Input()
  movie: MovieData = new MovieData();

  constructor(public languageService: LanguageService,
              public globals: Globals,
              private navigationService: NavigationService) {
  }

  ngOnInit() {
  }

  navigateToMovie(movieFilename: string) {
    this.navigationService.navigateToMovie(movieFilename);
  }
}
