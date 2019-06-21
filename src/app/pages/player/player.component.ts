import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {LanguageService} from "../../services/language.service";
import {Globals} from "../../util/Globals";
import {NavigationService} from "../../services/navigation.service";
import {ActivatedRoute} from "@angular/router";
import {MovieData} from "../../util/MovieData";
import {UsersService} from "../../services/users.service";
import {WatchedMovie} from "../../util/WatchedMovie";
import {MoviesService} from "../../services/movies.service";
import {EpisodeData} from "../../util/EpisodeData";

const MOVIES_PATH = '../../../assets/movies/';
const THUMBNAILS_PATH = '../../../assets/thumbnails/';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, AfterViewInit {
  source: string = '';
  thumbnail: string = '';
  moviename: string = '';
  hover: boolean = true;
  showVolume: boolean = false;

  season: string = '';
  episode: EpisodeData = new EpisodeData();
  isSeries: boolean = false;

  innerWidth: number = 0;
  innerHeight: number = 0;

  playIc: string = 'pause.png';
  muteIc: string = 'volumeUp.png';

  vidTime: number = 0;
  vidVolume: number = 100;


  constructor(public languageService: LanguageService,
              public globals: Globals,
              private navigationService: NavigationService,
              private activatedRoute: ActivatedRoute,
              private usersService: UsersService,
              private moviesService: MoviesService) {
    this.activatedRoute.data.subscribe((res) => {
      const movie = res.movie as MovieData;
      this.source = MOVIES_PATH + movie.filename + '.mp4';
      this.thumbnail = THUMBNAILS_PATH + movie.filename + '.jpg';
      this.moviename = movie.filename;

      if (window.location.pathname.includes('series')) {
        this.isSeries = true;
        this.season = window.location.pathname.split('/')[4];
        let episodeKey = window.location.pathname.split('/')[5];
        this.episode = this.moviesService.getEpisode(this.moviename, this.season, episodeKey);
        this.source = MOVIES_PATH + movie.filename + '/' + this.season + '/' + this.episode.filename + '.mp4';
      }
    });
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

    this.globals.view = 'watch';
  }

  /**
   * Properly sets up the custom controls.
   */
  ngAfterViewInit() {
    const vid = document.getElementById('myVideo') as HTMLVideoElement;
    vid.currentTime = this.getMovieTimestamp();
    vid.controls = false;
    vid.addEventListener('timeupdate', () => {
      this.vidTime = (vid.currentTime / vid.duration) * 100;
    });
    vid.addEventListener('volumechange', () => {

      this.vidVolume = vid.volume * 100;
    });
    let timerId = setTimeout(() => {
      this.hover = false;
    }, 5000);
    const vidContainer = document.getElementById('videoContainer') as HTMLDivElement;
    vidContainer.addEventListener('mousemove', () => {
      clearTimeout(timerId);
      this.hover = true;
      timerId = setTimeout(() => {
        this.hover = false;
      }, 5000);
    });
  }

  private getMovieTimestamp(): number {
    const watchedMovie = this.usersService.getWatchedMovie(this.moviename);
    if (watchedMovie.timestamp > 10) {
      watchedMovie.timestamp -= 10;
    }
    return watchedMovie.timestamp;
  }

  goBack() {
    const watchedMovie = new WatchedMovie();
    const vid = document.getElementById('myVideo') as HTMLVideoElement;

    if (this.isSeries) {
      watchedMovie.info = this.season + ';' + this.episode.filename;
    }
    watchedMovie.movieName = this.moviename;
    watchedMovie.timestamp = vid.currentTime;
    console.log(vid.currentTime);
    this.usersService.addMovieToWatched(watchedMovie);
    this.navigationService.navigateBack();
    // @ts-ignore
    if (!(!document.fullscreenElement && !document.mozFullScreenElement &&
      // @ts-ignore
      !document.webkitFullscreenElement && !document.msFullscreenElement)) {
      // @ts-ignore
      if (document.exitFullscreen) {
        // @ts-ignore
        document.exitFullscreen();
        // @ts-ignore
      } else if (document.msExitFullscreen) {
        // @ts-ignore
        document.msExitFullscreen();
        // @ts-ignore
      } else if (document.mozCancelFullScreen) {
        // @ts-ignore
        document.mozCancelFullScreen();
        // @ts-ignore
      } else if (document.webkitExitFullscreen) {
        // @ts-ignore
        document.webkitExitFullscreen();
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  playpause() {
    const video = document.getElementById('myVideo') as HTMLVideoElement;
    if (video.ended || video.paused) {
      video.play();
      this.playIc = 'pause.png';
    } else {
      video.pause();
      this.playIc = 'play.png';
    }
  }

  toggleMute() {
    const video = document.getElementById('myVideo') as HTMLVideoElement;

    if (video.muted) {
      video.muted = false;
      const myRange = document.getElementById('volumeRange') as HTMLInputElement;
      myRange.value = (video.volume * 100).toString();
      this.muteIc = 'volumeUp.png';
    } else {
      video.muted = true;
      const myRange = document.getElementById('volumeRange') as HTMLInputElement;
      myRange.value = (0).toString();
      this.muteIc = 'mute.png';
    }
  }

  setVolume() {
    const video = document.getElementById('myVideo') as HTMLVideoElement;
    const range = document.getElementById('volumeRange') as HTMLInputElement;
    video.volume = parseInt(range.value, 10) / 100;
  }

  skipSeconds(time: number) {
    const video = document.getElementById('myVideo') as HTMLVideoElement;
    video.currentTime += video.currentTime == 0 ? 0 : time;
  }

  keyDownFunction(event: Event) {
    // @ts-ignore
    switch (event.keyCode) {
      case 75 || 107:
        // K
        this.playpause();
        break;
      case 107:
        // K
        this.playpause();
        break;
      case 74 || 106:
        // J
        this.skipSeconds(-10);
        break;
      case 106:
        // J
        this.skipSeconds(-10);
        break;
      case 76 || 108:
        // L
        this.skipSeconds(10);
        break;
      case 108:
        // L
        this.skipSeconds(10);
        break;
      case 77:
        // M
        this.toggleMute();
        break;
    }
  }

  toggleFullscreen() {
    const elem = document.documentElement as HTMLElement;
    // @ts-ignore
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
      // @ts-ignore
      !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (elem.requestFullscreen) {
        // @ts-ignore
        elem.requestFullscreen();
        // @ts-ignore
      } else if (elem.msRequestFullscreen) {
        // @ts-ignore
        elem.msRequestFullscreen();
        // @ts-ignore
      } else if (elem.mozRequestFullScreen) {
        // @ts-ignore
        elem.mozRequestFullScreen();
        // @ts-ignore
      } else if (elem.webkitRequestFullscreen) {
        // @ts-ignore
        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      // @ts-ignore
      if (document.exitFullscreen) {
        // @ts-ignore
        document.exitFullscreen();
        // @ts-ignore
      } else if (document.msExitFullscreen) {
        // @ts-ignore
        document.msExitFullscreen();
        // @ts-ignore
      } else if (document.mozCancelFullScreen) {
        // @ts-ignore
        document.mozCancelFullScreen();
        // @ts-ignore
      } else if (document.webkitExitFullscreen) {
        // @ts-ignore
        document.webkitExitFullscreen();
      }
    }
  }

  mouseEnter() {
    this.hover = true;
  }

  mouseLeave() {
    this.hover = false;
  }

  changeTime() {
    const vid = document.getElementById('myVideo') as HTMLVideoElement;
    const range = document.getElementById('myRange') as HTMLInputElement;
    vid.currentTime = (parseInt(range.value, 10) / 100) * vid.duration;
  }

  volumeEnter() {
    this.showVolume = true;
  }

  volumeLeave() {
    this.showVolume = false;
  }

  goToNextEpisode() {
    let episodeDate = this.episode.nextEpisode.split('/');
    if (episodeDate.length < 2) {
      console.error('EpisdoData for next episode was faulty: ' + this.episode.nextEpisode);
    }
    this.navigationService.navigateToEpisode(this.moviename, episodeDate[0], episodeDate[1]);
  }

}
