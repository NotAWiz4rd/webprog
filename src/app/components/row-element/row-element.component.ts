import {Component, Input, OnInit} from '@angular/core';
import {MovieData} from "../../util/MovieData";
import {NavigationService} from "../../services/navigation.service";

@Component({
  selector: 'app-row-element',
  templateUrl: './row-element.component.html',
  styleUrls: ['./row-element.component.css']
})
export class RowElementComponent implements OnInit {
  // this can't be a const as it has to be accessed from the template
  THUMBNAILS_PATH = '../../../assets/thumbnails/';

  @Input()
  movie: MovieData = new MovieData();

  constructor(private navigationService: NavigationService) {
  }

  ngOnInit() {
  }

  navigateToMovie() {
    this.navigationService.navigateToMovie(this.movie.filename);
  }
}
