import {Component, OnInit} from '@angular/core';
import {Globals} from "../../util/Globals";
import {LanguageService} from "../../services/language.service";
import {NavigationService} from '../../services/navigation.service';
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public globals: Globals, public languageService: LanguageService, public navigationService: NavigationService, public usersService: UsersService) {
  }

  ngOnInit() {
  }

  changeLanguage(language: number) {
    this.languageService.changeLanguage(language);
    this.usersService.changeLanguage(language);
  }
}
