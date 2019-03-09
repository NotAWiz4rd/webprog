import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {MovieData} from "../util/MovieData";
import {MoviesService} from "../services/movies.service";

@Injectable()
export class MoviesResolver implements Resolve<MovieData> {
  constructor(private movieService: MoviesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovieData> | Promise<MovieData> | MovieData {
    return this.movieService.getMovie(route.params.movieKey);
  }
}
