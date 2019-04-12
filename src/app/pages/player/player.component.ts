import {Component, HostListener, OnInit} from '@angular/core';
import {LanguageService} from "../../services/language.service";
import {Globals} from "../../util/Globals";
import {NavigationService} from "../../services/navigation.service";
import {ActivatedRoute} from "@angular/router";
import {MovieData} from "../../util/MovieData";
import {UsersService} from "../../services/users.service";
import {WatchedMovie} from "../../util/WatchedMovie";

const MOVIES_PATH = '../../../assets/movies/';
const THUMBNAILS_PATH = '../../../assets/thumbnails/';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  movieSource: string = '';
  thumbnail: string = '';
  moviename: string = '';
  hover: boolean = true;
  innerWidth: number = 0;
  innerHeight: number = 0;

  playIc: string = 'pause.png';
  muteIc: string = 'volumeUp.png';

  constructor(public languageService: LanguageService,
              public globals: Globals,
              private navigationService: NavigationService,
              private activatedRoute: ActivatedRoute,
              private usersService: UsersService) {
    this.activatedRoute.data.subscribe((res) => {
      let movie = res.movie as MovieData;
      this.movieSource = MOVIES_PATH + movie.filename + '.mp4';
      this.thumbnail = THUMBNAILS_PATH + movie.filename + '.jpg';
      this.moviename = movie.filename;
      let vid = document.getElementById('myVideo');
    });
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

    this.globals.view = 'watch';

    let vid = document.getElementById('myVideo') as HTMLVideoElement;
    // @ts-ignore
    vid.currentTime = this.getMovieTimestamp();
    // @ts-ignore
    vid.controls = false;
    // @ts-ignore
    vid.addEventListener('timeupdate', () => {
      let timePos = vid.currentTime / vid.duration;
      console.log('Time ' + vid.currentTime)
      let timeline = document.getElementById('timeline') as HTMLDivElement;
      timeline.style.width = ((timePos * 100 ) + '%');
      console.log((timePos * 100 ));
    });
  }

  private getMovieTimestamp(): number {
    let watchedMovie = this.usersService.getWatchedMovie(this.moviename);
    if (watchedMovie.timestamp > 10) {
      watchedMovie.timestamp -= 10;
    }
    return watchedMovie.timestamp;
  }

  goBack() {
    let watchedMovie = new WatchedMovie();
    let vid = document.getElementById('myVideo');
    watchedMovie.movieName = this.moviename;
    // @ts-ignore
    watchedMovie.timestamp = vid.currentTime;
    this.usersService.addMovieToWatched(watchedMovie);
    this.navigationService.navigateBack();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  playpause() {
    // @ts-ignore
    let video = document.getElementById('myVideo') as HTMLVideoElement;
    // @ts-ignore
    if (video.ended || video.paused) {
      // @ts-ignore
      video.play();
      this.playIc = 'pause.png';
    } else {
      // @ts-ignore
      video.pause();
      this.playIc = 'play.png';
    }
  }

  toggleMute() {

    let video = document.getElementById('myVideo') as HTMLVideoElement;
    // @ts-ignore
    if (video.muted) {
      // @ts-ignore
      video.muted = false;
      this.muteIc = 'volumeUp.png';
    }
    else {
      // @ts-ignore
      video.muted = true;
      this.muteIc = 'mute.png';
    }
  }

  increaseVolume() {
    let video = document.getElementById('myVideo') as HTMLVideoElement;
    // @ts-ignore
    video.volume += video.volume == 1 ? 0 : 0.1;
  }

  decreaseVolume() {
    let video = document.getElementById('myVideo') as HTMLVideoElement;
    // @ts-ignore
    video.volume -= (video.volume == 0 ? 0 : 0.1);
  }

  skipSeconds(time: number) {
    let video = document.getElementById('myVideo') as HTMLVideoElement;
    // @ts-ignore
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

      /*case 173:
        // -
        this.decreaseVolume();
        break;

      case 171:
        // +
        this.increaseVolume();
        break;*/
    }
  }

  toggleFullscreen() {
    let video = document.getElementById('myVideo');
    // @ts-ignore
    if (video.requestFullscreen) {
      // @ts-ignore
      video.requestFullscreen();
      // @ts-ignore
    } else if (video.mozRequestFullScreen) {
      // @ts-ignore
      video.mozRequestFullScreen();
      // @ts-ignore
    } else if (video.webkitRequestFullscreen) {
      // @ts-ignore
      video.webkitRequestFullscreen();
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
}
