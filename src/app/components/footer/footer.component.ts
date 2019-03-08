import {Component, OnInit} from '@angular/core';
import {Globals} from "../../util/Globals";
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public globals: Globals, public languageService: LanguageService) {
  }

  ngOnInit() {
  }

  changeLanguage(language: number) {
    this.languageService.changeLanguage(language);
  }
}
