import {Component, OnInit} from '@angular/core';
import {User} from "../../util/User";
import {Globals} from "../../util/Globals";
import {UsersService} from "../../services/users.service";
import {NavigationService} from "../../services/navigation.service";
import {AuthService} from "../../services/auth.service";
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

// this class contains the implementation for the functions of the register page
export class RegisterPageComponent implements OnInit {
  registerEmail: string = '';
  registerPassword: string = '';
  registerRepeatPassword: string = '';

  registerPasswordValid: boolean = false;
  registerRepeatPasswordValid: boolean = false;
  registerEmailValid: boolean = false;
  registerAgbValid: boolean = false;

  constructor(public globals: Globals,
              public languageService: LanguageService,
              private usersService: UsersService,
              private navigationService: NavigationService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.globals.view = 'register';
  }

  onRegister(): boolean {
    if (this.registerAgbValid) {
      console.log('AGB checked');
      if (this.registerPassword.length < 4) {
        console.log('Register attempt failed: Password too short.');
        return false;
      }
      if (this.registerPassword === this.registerRepeatPassword) {
        let user = new User();
        user.password = RegisterPageComponent.encryptPw(this.registerPassword);
        user.email = this.registerEmail;
        this.usersService.addUser(user);
        this.globals.currentUser = user;
        this.authService.setLoggedIn(true);
        this.navigationService.navigateToView('overview');
        return true;
      } else {
        console.log('AGB not checked');
        return false;
      }
    } else {
      return false;
    }
  }

  registerButtonClickable(): boolean {
    return !!(this.registerPasswordValid && this.registerRepeatPasswordValid && this.registerAgbValid && this.registerEmailValid);
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
    this.registerRepeatPasswordValid = !!(regPass === this.registerPassword && this.registerRepeatPassword.length >= 4);
  }

  checkedAGBRegisterChange(checked: boolean) {
    this.registerAgbValid = checked;
  }

  emailRegisterChange(mail: string) {
    this.registerEmailValid = mail.length >= 4;
    this.registerEmail = mail;
  }

  private static encryptPw(password: string): string {
    return window.btoa(password);
  }

  goToAGBs() {
    window.open("agb", "_blank")
  }
}
