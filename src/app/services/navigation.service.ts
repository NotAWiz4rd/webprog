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
    this.globals.view = view;
    console.log('Changed view to ' + view);
    this.router.navigateByUrl(view);
  }

  navigateToMovie(movie: string) {
    this.globals.view = 'watch';
    console.log('Changed view to movie: ' + movie);
    this.router.navigateByUrl('watch/' + movie);
  }

  navigateBack(view: string) {
    this.globals.view = view;
    console.log('Navigating to previous page');
    this.location.back();
  }

  navigateToEpisode(series: string, seasonKey: string, episode: string) {
    this.globals.view = 'watch';
    console.log("Changed view to episode: " + series + ", " + seasonKey + ", " + episode);
    this.router.navigateByUrl('watch/' + series + "/series/" + seasonKey + "/" + episode);
  }
}
