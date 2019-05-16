import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LanguageService} from '../../services/language.service';
import {AuthService} from '../../services/auth.service';
import {NavigationService} from '../../services/navigation.service';
import {Globals} from '../../util/Globals';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  email: string = '';
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
    } else {
      this.globals.view = 'login';
    }
  }

  onLogin(): boolean {
    if (this.authService.isLoggedIn() || this.lookForMatch()) {
      this.navigationService.navigateToView('overview');
      this.languageService.changeLanguage(this.globals.currentUser.language);
      return true;
    }
    console.log('Login attempt failed: Password or name wrong or user does not exist.');
    return false;
  }

  mailInputChange(mail: string) {
    this.email = mail;
  }

  passwordInputChange(password: string) {
    this.loginPassword = password;
  }

  // ToDo: Is this working???
  loginButtonClickable(): boolean {
    if (this.loginPassword.length >= 4 && this.email.length >= 4) {
      return true;
    } else {
      return false;
    }
  }

  private lookForMatch(): boolean {
    let foundUser = false;
    this.globals.userData.forEach(user => {
      if (user.email === this.email && user.password === this.encryptPw(this.loginPassword)) {
        console.log('Correct login for user ' + this.email + ' received.');
        this.globals.currentUser = user;
        this.authService.setLoggedIn(true);
        foundUser = true;
      }
    });
    return foundUser;
  }

  keyDownFunction(event: Event) {
    // @ts-ignore
    if (event.keyCode === 13) {
      this.onLogin();
    }
  }

  navigateToRegister() {
    this.navigationService.navigateToView('register');
  }

  private encryptPw(password: string): string {
    return window.btoa(password);
  }
}

