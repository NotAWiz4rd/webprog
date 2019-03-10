import { Component, OnInit } from '@angular/core';
import {NavigationService} from "../../services/navigation.service";
import {Globals} from "../../util/Globals";
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(public navigationService: NavigationService,
              public globals: Globals,
              public languageService: LanguageService) { }

  ngOnInit() {
  }

}
