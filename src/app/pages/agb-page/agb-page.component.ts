import {Component, OnInit} from '@angular/core';
import {Globals} from "../../util/Globals";

@Component({
  selector: 'app-agb-page',
  templateUrl: './agb-page.component.html',
  styleUrls: ['./agb-page.component.css']
})
export class AgbPageComponent implements OnInit {

  constructor(public globals: Globals) {
  }

  ngOnInit() {
    this.globals.view = 'agb';
  }

}
