import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Globals} from "../util/Globals";
import {Location} from "@angular/common";

@Injectable()
export class NavigationService {
  constructor(private router: Router,
              private globals: Globals,
              private location: Location) {
  }

  navigateToView(view: string) {
    console.log('Changed view to ' + view);
    this.router.navigateByUrl(view);
  }

  navigateToMovie(movie: string) {
    console.log('Changed view to movie: ' + movie);
    this.router.navigateByUrl('watch/' + movie);
  }

  navigateBack() {
    console.log('Navigating to previous page');
    this.location.back();
  }
}
