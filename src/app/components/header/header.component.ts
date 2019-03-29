import {Component, OnInit} from '@angular/core';
import {Globals} from "../../util/Globals";
import {Router} from "@angular/router";
import {LanguageService} from "../../services/language.service";
import {AuthService} from "../../services/auth.service";
import {NavigationService} from "../../services/navigation.service";
import {User} from "../../util/User";
import {MoviesService} from "../../services/movies.service";

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
              private navigationService: NavigationService,
              private moviesService: MoviesService) {
  }

  ngOnInit() {
  }

  logoutUser() {
    this.authService.logoutUser();
    this.globals.currentUser = new User();
    this.navigateToLogin()
  }

  navigateToLogin() {
    this.navigationService.navigateToView('login')
  }

  navigateToList() {
    this.navigationService.navigateToView('my-list');
  }


  navigateToOverview() {
    this.navigationService.navigateToView('overview');
  }

  randomVideo(){
    let random = Math.floor(Math.random()*this.globals.movieData.length) + 1
    let movie = this.globals.movieData[random].filename
    this.navigationService.navigateToMovie(movie);
  }
}
