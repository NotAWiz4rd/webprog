import {Injectable} from "@angular/core";
import {MovieData} from "../util/MovieData";
import {Globals} from "../util/Globals";
import {WatchedMovie} from "../util/WatchedMovie";
import {EpisodeData} from "../util/EpisodeData";

const MOVIE_SUGGESTION_THRESHOLD: number = 1;

@Injectable()
export class MoviesService {
  constructor(private globals: Globals) {
  }

  /**
   * Gets a movie by its filename.
   * @param movieKey The filename/key of the movie.
   */
  getMovie(movieKey: string): MovieData {
    let selectedMovie: MovieData = new MovieData();
    this.globals.movieData.forEach(movie => {
      if (movie.filename == movieKey) {
        selectedMovie = movie;
      }
    });
    this.globals.seriesData.forEach(series => {
      if (series.filename == movieKey) {
        selectedMovie = series;
      }
    });
    return selectedMovie;
  }

  /**
   * Analyses watched movies and returns a list of movies with similar attributes.
   * @param watchedMovies The list of watched movies of the user.
   */
  compileMovieSuggestions(watchedMovies: WatchedMovie[]): MovieData[] {
    let moviesToAnalyze = this.getMovies(watchedMovies);

    let genres: string[] = [];
    let tags: string[] = [];
    let directors: string[] = [];

    // collect genres, director and tags
    moviesToAnalyze.forEach(movie => {
      movie.genres.forEach(genre => {
        genres.push(genre);
      });
      movie.tags.forEach(tag => {
        tags.push(tag);
      });
      directors.push(movie.director);
    });

    // order and analyze tags, genres and directors
    let analyzedGenres: Map<string, number> = this.getNumberedMap(genres);
    let analyzedDirectors: Map<string, number> = this.getNumberedMap(directors);
    let analyzedTags: Map<string, number> = this.getNumberedMap(tags);

    let filteredGenres: string[] = [];
    let filteredTags: string[] = [];
    let filteredDirectors: string[] = [];

    genres.forEach(genre => {
      // @ts-ignore
      if (analyzedGenres.get(genre) > MOVIE_SUGGESTION_THRESHOLD) {
        if (!filteredGenres.includes(genre)) {
          filteredGenres.push(genre);
        }
      }
    });

    tags.forEach(tag => {
      // @ts-ignore
      if (analyzedTags.get(tag) > MOVIE_SUGGESTION_THRESHOLD) {
        if (!filteredTags.includes(tag)) {
          filteredTags.push(tag);
        }
      }
    });

    directors.forEach(director => {
      // @ts-ignore
      if (analyzedDirectors.get(director) > MOVIE_SUGGESTION_THRESHOLD) {
        if (!filteredDirectors.includes(director)) {
          filteredDirectors.push(director);
        }
      }
    });

    let suggestedMovies: MovieData[] = [];

    // go through all movies and select the ones that match the criteria
    for (let i = 0; i < this.globals.movieData.length; i++) {
      if (!this.getMovies(this.globals.currentUser.watchedList).includes(this.globals.movieData[i])) {
        filteredGenres.forEach(genre => {
          if (this.globals.movieData[i].genres.includes(genre)) {
            suggestedMovies.push(this.globals.movieData[i]);
          }
        });

        filteredTags.forEach(tag => {
          if (this.globals.movieData[i].tags.includes(tag) && !suggestedMovies.includes(this.globals.movieData[i])) {
            suggestedMovies.push(this.globals.movieData[i]);
          }
        });

        filteredDirectors.forEach(director => {
          if (this.globals.movieData[i].director === director && !suggestedMovies.includes(this.globals.movieData[i])) {
            suggestedMovies.push(this.globals.movieData[i]);
          }
        });
      }
    }

    console.log('Compiled a list of suggested movies.');

    return suggestedMovies;
  }

  getRecentlyWatchedMovies(amount: number): MovieData[] {
    let start = this.globals.currentUser.watchedList.length - amount >= 0 ? this.globals.currentUser.watchedList.length - amount : 0;
    return this.getMovies(this.globals.currentUser.watchedList.slice(start, this.globals.currentUser.watchedList.length)).reverse();
  }

  private getNumberedMap(strings: string[]): Map<string, number> {
    let analyzedStrings: Map<string, number> = new Map();
    strings.forEach(string => {
      if (analyzedStrings.get(string) != undefined) {
        // @ts-ignore
        analyzedStrings.set(string, analyzedStrings.get(string) + 1);
      } else {
        analyzedStrings.set(string, 1);
      }
    });
    return analyzedStrings;
  }

  private getMovies(watchedMovies: WatchedMovie[]): MovieData[] {
    let movies: MovieData[] = [];
    watchedMovies.forEach(watchedMovie => {
      let movie: MovieData = this.getMovie(watchedMovie.movieName);
      if (!movie.isSeries) {
        movies.push(movie);
      }
    });

    return movies;
  }

  getEpisode(seriesKey: string, seasonKey: string, episodeKey: string): EpisodeData {
    let episodeData: EpisodeData = new EpisodeData();
    this.globals.seriesData.forEach(series => {
      if (series.filename === seriesKey) {
        series.seasons.forEach(season => {
          if (season.key === seasonKey) {
            season.episodes.forEach(episode => {
              if (episode.filename === episodeKey) {
                episodeData = episode;
              }
            });
          }
        });
      }
    });
    return episodeData;
  }

  getNextEpisode(seriesKey: string, seasonKey: string, episodeKey: string): string {
    return this.getEpisode(seriesKey, seasonKey, episodeKey).nextEpisode;
  }
}
