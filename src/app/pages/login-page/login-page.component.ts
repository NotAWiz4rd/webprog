import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from "../../util/User";
import {Globals} from "../../util/Globals";
import {LanguageService} from "../../services/language.service";
import {AuthService} from "../../services/auth.service";
import {NavigationService} from "../../services/navigation.service";
import {UsersService} from "../../services/users.service";
import {ignore} from "selenium-webdriver/testing";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginName: string = '';
  loginPassword: string = '';
  registerUsername: string = '';
  registerEmail: string = '';
  registerPassword: string = '';
  registerRepeatPassword: string = '';
  registerCheckedAGB: boolean = false;
  showRegister: boolean = false;

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

  userNameRegisterChange(username: string) {
    this.registerUsername = username;
  }

  passwordRegisterChange(password: string) {
    this.registerPassword = password;
  }

  repeatpasswordRegisterChange(password: string) {
    this.registerRepeatPassword = password;
  }

  checkedAGBRegisterChange(checked: boolean) {
    this.registerCheckedAGB = checked;
  }

  emailRegsiterChange(mail: string) {
    this.registerEmail = mail;
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
    if (this.registerPassword.length < 4 || this.registerUsername.length < 4) {
      console.log('Register attempt failed: Password or name too short.');
      return false;
    }

    if (this.registerPassword === this.registerRepeatPassword) {
      let user = new User();
      user.name = this.registerUsername;
      user.password = this.registerPassword;
      user.email = this.registerEmail;
      this.usersService.addUser(user);
      return true;
    } else {
      return false;
    }
  }

  keyDownFunction(event: Event) {
    // @ts-ignore
    if (event.keyCode === 13) {
      this.onLogin();
    }
  }

  showRegistertoUser() {
    this.showRegister = !this.showRegister;
  }
}

