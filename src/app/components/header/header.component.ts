import {Component, OnInit} from '@angular/core';
import {Globals} from "../../util/Globals";
import {Router} from "@angular/router";
import {LanguageService} from "../../services/language.service";
import {AuthService} from "../../services/auth.service";
import {NavigationService} from "../../services/navigation.service";

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
