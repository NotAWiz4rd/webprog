import {Component, OnInit} from '@angular/core';
import {Globals} from "../../globals";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private globals: Globals) {
  }

  ngOnInit() {
  }

  changeLanguage(language: number) {
    this.globals.language = language;
  }
}
