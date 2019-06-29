import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {LanguageService} from '../../services/language.service';
import {Globals} from "../../util/Globals";


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})

// The landing page is the page you first see when you call the site.
// Other then the footer (see footer component)
// it only has one function: the join button so you can join the best
// streaming community ever!

export class LandingPageComponent implements OnInit {

  constructor(private navigationService: NavigationService,
              public languageService: LanguageService,
              public globals: Globals) {
  }

  ngOnInit() {
  }

  clickJoin() {
    this.navigationService.navigateToView('login');
  }

}
