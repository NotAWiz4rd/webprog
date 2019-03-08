import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Globals} from "../util/Globals";

@Injectable()
export class NavigationService {
  constructor(private router: Router, private globals: Globals) {
  }

  navigateToView(view: string) {
    this.globals.view = view;
    console.log('Changed view to ' + view);
    this.router.navigateByUrl(view);
  }
}
