import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Globals} from "../globals";
import {StaticText} from "../util/StaticText";

const TEXTFILE_PATH = '../../../assets/texts.json';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  view: string = 'login';

  constructor(private http: HttpClient, private globals: Globals) {
  }

  ngOnInit() {
    // load file with static texts
    this.http.get(TEXTFILE_PATH)
      .subscribe(data => {
        this.globals.staticTexts = data as StaticText[];
        console.log('Loaded static texts.');
      });
  }

  changeView(view: string) {
    this.view = view;
    console.log('Changed view to ' + view);
  }
}
