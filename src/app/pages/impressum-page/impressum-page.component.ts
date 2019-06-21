import {Component, OnInit} from '@angular/core';
import {Globals} from "../../util/Globals";
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'app-impressum-page',
  templateUrl: './impressum-page.component.html',
  styleUrls: ['./impressum-page.component.css']
})
export class ImpressumPageComponent implements OnInit {

  constructor(public globals: Globals,
              public languageService: LanguageService) {
  }

  ngOnInit() {
    this.globals.view = 'impressum';
  }
}
