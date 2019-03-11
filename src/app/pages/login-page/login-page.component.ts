import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from "../../util/User";
import {Globals} from "../../util/Globals";
import {LanguageService} from "../../services/language.service";
import {AuthService} from "../../services/auth.service";
import {NavigationService} from "../../services/navigation.service";
import {UsersService} from "../../services/users.service";

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
              private navigationService: NavigationService,
              private usersService: UsersService) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.navigationService.navigateToView('overview');
    } else {
      this.globals.view = 'login';
    }
  }

  onLogin() {
    if (this.authService.isLoggedIn() || this.lookForMatch()) {
      this.navigationService.navigateToView('overview');
    }
  }

  mailInputChange(mail: string) {
    this.loginName = mail;
  }

  passwordInputChange(password: string) {
    this.loginPassword = password;
  }

  private lookForMatch(): boolean {
    let foundUser = false;
    this.globals.userData.forEach(user => {
      if (user.name === this.loginName && user.password === this.loginPassword) {
        console.log('Correct login for user ' + this.loginName + ' received.');
        this.authService.setLoggedIn(true);
        foundUser = true;
      }
    });
    return foundUser;
  }

  onRegister() {
    // todo block if username or password are empty
    let user = new User();
    user.name = this.loginName;
    user.password = this.loginPassword;
    this.usersService.addUser(user);
  }
}

