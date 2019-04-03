import {Component, Input, OnInit} from '@angular/core';
import {MovieData} from "../../util/MovieData";
import {Router} from "@angular/router";

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit {

  @Input()
  movies: MovieData[] = [];

  @Input()
  headline: string = '';

  @Input()
  link: string = '';

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navigate() {
    if (this.link != '') {
      this.router.navigateByUrl(this.link);
    }
  }
}
