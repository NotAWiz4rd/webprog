import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  view: string = 'login';

  constructor() {
  }

  ngOnInit() {
  }

  changeView(view: string) {
    this.view = view;
    console.log('Changed view to ' + view);
  }
}
