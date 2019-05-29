import {Component, Input, OnInit} from '@angular/core';
import {MovieData} from "../../util/MovieData";
import {NavigationService} from "../../services/navigation.service";
import {Globals} from "../../util/Globals";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-row-element',
  templateUrl: './row-element.component.html',
  styleUrls: ['./row-element.component.css']
})
export class RowElementComponent implements OnInit {
  // this can't be a const as it has to be accessed from the template
  THUMBNAILS_PATH = '../../../assets/thumbnails/';
  hover: boolean = true;
  @Input()
  movie: MovieData = new MovieData();

  constructor(private navigationService: NavigationService,
              public globals: Globals,
              private usersService: UsersService) {
  }

  ngOnInit() {
  }

  navigateToMovie() {
    this.navigationService.navigateToMovie(this.movie.filename);
  }

  hoverShowDescription() {
    let timerId = setTimeout(() => {
      this.hover = true;
    }, 3000);
  }

  hoverLeave() {
    // this.hover = false;
  }

  movieIsInList(): boolean {
    return this.globals.currentUser.movieList.includes(this.movie.filename);
  }

  removeMovieFromList() {
    this.usersService.removeMovieFromList(this.movie);
  }
}
