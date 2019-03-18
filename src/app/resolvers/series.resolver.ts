import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {MoviesService} from "../services/movies.service";
import {Observable} from "rxjs";
import {EpisodeData} from "../util/EpisodeData";

@Injectable()
export class SeriesResolver implements Resolve<EpisodeData> {
  constructor(private movieService: MoviesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EpisodeData> | Promise<EpisodeData> | EpisodeData {
    return this.movieService.getEpisode(route.params.movieKey, route.params.seasonKey, route.params.episodeKey);
  }
}
