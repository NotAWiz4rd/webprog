import {Component, Input, OnInit} from '@angular/core';
import {MovieData} from "../../util/MovieData";
import {NavigationService} from "../../services/navigation.service";
import {Globals} from "../../util/Globals";
import {UsersService} from "../../services/users.service";
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'app-row-element',
  templateUrl: './row-element.component.html',
  styleUrls: ['./row-element.component.css']
})
export class RowElementComponent implements OnInit {
  // this can't be a const as it has to be accessed from the template
  THUMBNAILS_PATH = '../../../assets/thumbnails/';
  hover: boolean = false;
  details: boolean = false;
  timer: any;
  @Input()
  movie: MovieData = new MovieData();

  constructor(private navigationService: NavigationService,
              public globals: Globals,
              private usersService: UsersService,
              public languageService: LanguageService) {
  }

  ngOnInit() {
  }

  navigateToMovie() {
    this.navigationService.navigateToMovie(this.movie.filename);
  }

  hoverShowDescription(i: number) {
    this.timer = setTimeout(() => {
      this.hover = true;
    }, i);
  }

  hoverLeave() {
    if (!this.details) {
      clearTimeout(this.timer);
      this.hover = false;
    }
  }

  movieIsInList(): boolean {
    return this.globals.currentUser.movieList.includes(this.movie.filename);
  }

  removeMovieFromList() {
    this.usersService.removeMovieFromList(this.movie);
  }

  showInfo() {
    this.hover = true;
    this.details = !this.details;
  }
}
