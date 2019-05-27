import { Component, OnInit } from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {LanguageService} from '../../services/language.service';
import {Globals} from "../../util/Globals";


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  join: string = 'JOIN NOW';

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
