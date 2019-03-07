import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from "../../util/User";
import {AuthService} from "../../util/auth.service";
import {LanguageService} from "../../util/language.service";
import {Globals} from "../../util/globals";
import {NavigationService} from "../../util/navigation.service";

const USERFILE_PATH = '../../../assets/users.json';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginName: string = '';
  loginPassword: string = '';

  constructor(public globals: Globals,
              public languageService: LanguageService,
              private authService: AuthService,
              private http: HttpClient,
              private navigationService: NavigationService) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.navigationService.navigateToView('overview');
    }
  }

  onLogin() {
    // load file with users - reload this every time, in case the users have changed
    this.http.get(USERFILE_PATH)
      .subscribe(data => {
        const userData = data as User[];
        console.log('Loaded user data.');
        if (this.authService.isLoggedIn() || this.lookForMatch(userData)) {
          this.navigationService.navigateToView('overview');
        }
      });
  }

  mailInputChange(mail: string) {
    this.loginName = mail;
  }

  passwordInputChange(password: string) {
    this.loginPassword = password;
  }

  private lookForMatch(data: User[]): boolean {
    let foundUser = false;
    data.forEach(user => {
      if (user.name === this.loginName && user.password === this.loginPassword) {
        console.log('Correct login for user ' + this.loginName + ' received.');
        this.authService.setLoggedIn(true);
        foundUser = true;
      }
    });
    return foundUser;
  }
}

