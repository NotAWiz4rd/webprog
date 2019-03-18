import {Component, Input, OnInit} from '@angular/core';
import {SeriesData} from "../../util/SeriesData";
import {LanguageService} from "../../services/language.service";
import {Globals} from "../../util/Globals";
import {NavigationService} from "../../services/navigation.service";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-series-preview',
  templateUrl: './series-preview.component.html',
  styleUrls: ['./series-preview.component.css']
})
export class SeriesPreviewComponent implements OnInit {
  @Input()
  series: SeriesData = new SeriesData();

  constructor(public languageService: LanguageService,
              public globals: Globals,
              private navigationService: NavigationService,
              private usersService: UsersService) {
  }

  ngOnInit() {
  }

  navigateToSeries() {
    // todo navigate to first episode if not on watchlist
    // todo navigate to last watched episode if on watchlist
    // this.navigationService.navigateToEpisode(this.series.filename);
  }

}
