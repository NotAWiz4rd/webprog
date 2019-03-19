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
    let watchedSeries = this.usersService.getWatchedMovie(this.series.filename);
    if (watchedSeries.info != '') {
      this.navigateToEpisode(watchedSeries.info);
    }

    let firstSeason = this.series.seasons[0];
    this.navigationService.navigateToEpisode(this.series.filename, firstSeason.key, firstSeason.episodes[0].filename);
  }

  private navigateToEpisode(info: string) {
    let infos = info.split(';');
    if (infos.length < 2) {
      console.log('WatchedList contained not enough info to navigate to episode - data might be corrupt.');
      return;
    }

    let seasonKey = infos[0];
    let episode = infos[1];
    this.navigationService.navigateToEpisode(this.series.filename, seasonKey, episode);
  }
}
