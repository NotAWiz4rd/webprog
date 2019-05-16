import {Component, OnInit} from '@angular/core';
import {StaticText} from "./util/StaticText";
import {HttpClient} from "@angular/common/http";
import {Globals} from "./util/Globals";
import {UsersService} from "./services/users.service";
import {AuthService} from "./services/auth.service";

const TEXTFILE_PATH = '../../../assets/texts.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public globals: Globals,
              private http: HttpClient,
              private usersService: UsersService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.usersService.loadUsersFromServer();
    this.authService.isLoggedIn();
    this.loadTexts();
  }

  loadTexts() {
    // load file with static texts
    this.http.get(TEXTFILE_PATH)
      .subscribe(data => {
        this.globals.staticTexts = data as StaticText[];
        console.log('Loaded static texts.');
      });

  }
}
