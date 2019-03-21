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

  onLogin(): boolean {
    if (this.loginPassword.length < 4 || this.loginName.length < 4) {
      console.log('Login attempt failed: Password or name too short.');
      return false;
    }

    if (this.authService.isLoggedIn() || this.lookForMatch()) {
      this.navigationService.navigateToView('overview');
      return true;
    }
    console.log('Login attempt failed: Password or name wrong or user doesnt exist.');
    return false;
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
        this.globals.currentUser = user;
        this.authService.setLoggedIn(true);
        foundUser = true;
      }
    });
    return foundUser;
  }

  onRegister(): boolean {
    if (this.loginPassword.length < 4 || this.loginName.length < 4) {
      console.log('Register attempt failed: Password or name too short.');
      return false;
    }

    let user = new User();
    user.name = this.loginName;
    user.password = this.loginPassword;
    this.usersService.addUser(user);
    return true;
  }

  keyDownFunction(event) {
    if(event.keyCode === 13) {
      this.onLogin();
     }
  }
}

