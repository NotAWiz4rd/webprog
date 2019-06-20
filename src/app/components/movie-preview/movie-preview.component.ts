import {Component, Input, OnInit} from '@angular/core';
import {NavigationService} from "../../services/navigation.service";
import {LanguageService} from "../../services/language.service";
import {Globals} from "../../util/Globals";
import {MovieData} from "../../util/MovieData";
import {UsersService} from "../../services/users.service";

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
    this.navigationService.navigateToMovie(movieFilename);
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
}
