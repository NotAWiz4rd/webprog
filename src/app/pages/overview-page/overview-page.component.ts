import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MovieData} from "../../util/MovieData";
import {LanguageService} from "../../services/language.service";

const MOVIEDATA_PATH = '../../../assets/movieData.json';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit {

  movieData: MovieData[] = [];

  constructor(public languageService: LanguageService, private http: HttpClient) {
    // load file with movie data - reload this every time, in case the movies have changed
    this.http.get(MOVIEDATA_PATH)
      .subscribe(data => {
        const movieData = data as MovieData[];
        console.log('Loaded movies data.');
        this.movieData = movieData;
      });
  }

  ngOnInit() {
  }

}
