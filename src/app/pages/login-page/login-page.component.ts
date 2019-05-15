import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../util/User';
import {LanguageService} from '../../services/language.service';
import {AuthService} from '../../services/auth.service';
import {NavigationService} from '../../services/navigation.service';
import {UsersService} from '../../services/users.service';
import {Globals} from '../../util/Globals';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginName: string = '';
  loginPassword: string = '';
  registerEmail: string = '';
  registerPassword: string = '';
  registerRepeatPassword: string = '';
  showRegister: boolean = false;
  registerPasswordValid: boolean = false;
  registerRepeatPasswordValid: boolean = false;
  registerEmailValid: boolean = false;
  registerAgbValid: boolean = false;

  message: string = '';
  showMessage: boolean = false;


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
    if (this.authService.isLoggedIn() || this.lookForMatch()) {
      this.showMessage = false;
      this.navigationService.navigateToView('overview');
      return true;
    }
    this.showMessage = true;
    //ToDo: translate messages into other languages
    this.message = 'Login attempt failed: Password or name wrong or user does not exist.';
    console.log('Login attempt failed: Password or name wrong or user does not exist.');
    return false;
  }

  mailInputChange(mail: string) {
    this.loginName = mail;
  }

  passwordInputChange(password: string) {
    this.loginPassword = password;
  }

  // ToDo: Is this working???
  registerButtonClickable(): boolean {
    if(this.registerPasswordValid && this.registerRepeatPasswordValid && this.registerAgbValid && this.registerEmailValid){
      return true;
    }
    else {
      return false;
    }
  }

  // ToDo: Is this working???
  loginButtonClickable(): boolean {
    if (this.loginPassword.length >= 4 && this.loginName.length >= 4) {
      return true;
    } else {
      return false;
    }
  }

  passwordRegisterChange(pass: string) {
    this.registerPassword = pass;
    this.registerPasswordValid = pass.length >= 4;
    if (pass === this.registerRepeatPassword && this.registerRepeatPassword && this.registerRepeatPassword.length >= 4) {
      this.registerRepeatPasswordValid = true;
    } else {
      this.registerRepeatPasswordValid = false;
    }
  }

  repeatPasswordRegisterChange(regPass: string) {
    this.registerRepeatPassword = regPass;
    if (regPass === this.registerPassword && this.registerRepeatPassword.length >= 4) {
      this.registerRepeatPasswordValid = true;
    } else {
      this.registerRepeatPasswordValid = false;
    }
  }

  checkedAGBRegisterChange(checked: boolean) {
    this.registerAgbValid = checked;
  }

  emailRegisterChange(mail: string) {
    if (mail.length >= 4) {
      this.registerEmailValid = true;
    } else {
      this.registerEmailValid = false;
    }
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
    if (this.registerAgbValid) {

      console.log('AGB checked');
      if (this.registerPassword.length < 4) {
        console.log('Register attempt failed: Password too short.');
        return false;
        // ToDo: Error Message???
      }
      if (this.registerPassword === this.registerRepeatPassword) {
        let user = new User();
        user.password = this.registerPassword;
        user.email = this.registerEmail;
        this.usersService.addUser(user);
        return true;
      } else {
        console.log('AGB not checked');
        return false;
      }
    } else {
      return false;
    }
    //ToDo: This Code is unreachable? Why is it there?
    this.showMessage = true;
    if (this.loginPassword.length < 4 || this.loginName.length < 4) {
      // todo translate message texts
      this.message = 'Register attempt failed: Password or name too short.';
      console.log('Register attempt failed: Password or name too short.');
      return false;
    } else {
      console.log('Register successful');
      this.message = 'Successfully registered.';
    }

    const user = new User();
    user.name = this.loginName;
    user.password = this.loginPassword;
    this.usersService.addUser(user);
    return true;
  }

  keyDownFunction(event: Event) {
    // @ts-ignore
    if (event.keyCode === 13) {
      this.onLogin();
    }
  }

  showRegistertoUser() {
    // ToDo: Disable if already on register. Enable change to Login register when login register button is clicked
    this.showRegister = !this.showRegister;
  }
}

