import {Component, OnInit} from '@angular/core';
import {LanguageService} from "../../util/language.service";
import {Globals} from "../../util/globals";
import {AuthService} from "../../util/auth.service";
import {Router} from "@angular/router";
import {NavigationService} from "../../util/navigation.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public languageService: LanguageService,
              public globals: Globals,
              public authService: AuthService,
              private router: Router,
              private navigationService: NavigationService) {
  }

  ngOnInit() {
  }

  logoutUser() {
    this.authService.logoutUser();
    this.navigateToLogin()
  }

  navigateToLogin() {
    this.navigationService.navigateToView('login')
  }
}
