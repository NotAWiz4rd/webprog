import {Component, OnInit} from '@angular/core';
import {Globals} from "../../util/Globals";
import {MoviesService} from "../../services/movies.service";
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  constructor(public globals: Globals,
              public moviesService: MoviesService,
              public languageService: LanguageService) {
  }

  ngOnInit() {
    this.globals.view = 'my-list';
  }
}
