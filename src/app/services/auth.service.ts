import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";
import {Globals} from "../util/Globals";
import {UsersService} from "./users.service";
import {User} from "../util/User";

@Injectable()
export class AuthService implements CanActivate {
  constructor(private globals: Globals,
              private usersService: UsersService) {
  }

  isLoggedIn(): boolean {
    return this.canActivate();
  }

  setLoggedIn(isLoggedIn: boolean) {
    localStorage.setItem('loggedIn', String(isLoggedIn));
    localStorage.setItem('user', this.globals.currentUser.email);
  }

  logoutUser() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
  }

  userStillLoggedIn(): boolean {
    if (localStorage.getItem('user') != null) {
      // @ts-ignore because we just checked whether the variable is null
      this.globals.currentUser = this.usersService.getUser(localStorage.getItem('user'));
    } else {
      this.globals.currentUser = new User();
    }
    return localStorage.getItem('loggedIn') === 'true';
  }

  canActivate(): boolean {
    return this.userStillLoggedIn();
  }
}
