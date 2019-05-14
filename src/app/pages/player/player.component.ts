import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {LanguageService} from "../../services/language.service";
import {Globals} from "../../util/Globals";
import {NavigationService} from "../../services/navigation.service";
import {ActivatedRoute} from "@angular/router";
import {MovieData} from "../../util/MovieData";
import {UsersService} from "../../services/users.service";
import {WatchedMovie} from "../../util/WatchedMovie";
import {falseIfMissing} from "protractor/built/util";
import {timer} from "rxjs";

const MOVIES_PATH = '../../../assets/movies/';
const THUMBNAILS_PATH = '../../../assets/thumbnails/';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, AfterViewInit {
  movieSource: string = '';
  thumbnail: string = '';
  moviename: string = '';
  hover: boolean = true;
  isFullscreen: boolean = false;
  showVolume: boolean = false;
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
              private usersService: UsersService) {
    this.activatedRoute.data.subscribe((res) => {
      const movie = res.movie as MovieData;
      this.movieSource = MOVIES_PATH + movie.filename + '.mp4';
      this.thumbnail = THUMBNAILS_PATH + movie.filename + '.jpg';
      this.moviename = movie.filename;
    });
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

    this.globals.view = 'watch';
  }

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
    // document.onfullscreenchange = (() => {console.log('Fullscreen toggeled'); this.isFullscreen = !this.isFullscreen; } );
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
    watchedMovie.movieName = this.moviename;
    watchedMovie.timestamp = vid.currentTime;
    console.log(vid.currentTime);
    this.usersService.addMovieToWatched(watchedMovie);
    this.navigationService.navigateBack();
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

  /*increaseVolume() {
    const video = document.getElementById('myVideo') as HTMLVideoElement;
    video.volume += video.volume == 1 ? 0 : 0.1;
  }

  decreaseVolume() {
    const video = document.getElementById('myVideo') as HTMLVideoElement;
    video.volume -= (video.volume == 0 ? 0 : 0.1);
  }*/

  skipSeconds(time: number) {
    const video = document.getElementById('myVideo') as HTMLVideoElement;
    video.currentTime += video.currentTime == 0 ? 0 : time;
  }

  keyDownFunction(event: Event) {
    // @ts-ignore
    console.log(event.keyCode);
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

  // @ts-ignore
  toggleFullscreen() {
    const elem = document.documentElement as HTMLElement;
    // @ts-ignore
    if (document.fullscreenElement == null
      || document.mozFullScreenElement == null
      || document.msFullscreenElement == null
      || document.webkitFullscreenElement == null) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
      }
      this.isFullscreen = true;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      this.isFullscreen = false;
    }
  }

  mouseEnter() {
    this.hover = true;
    console.log('Hover = ' + this.hover);

  }

  mouseLeave() {
    this.hover = false;
    console.log('Hover = ' + this.hover);
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

}
