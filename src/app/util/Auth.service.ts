import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";
import {NavigationService} from "./navigation.service";
import {Globals} from "./globals";

@Injectable()
export class AuthService implements CanActivate {
  constructor(private navigationService: NavigationService,
              private globals: Globals) {
  }

  isLoggedIn(): boolean {
    return this.canActivate();
  }

  setLoggedIn(isLoggedIn: boolean) {
    localStorage.setItem('loggedIn', String(isLoggedIn));
  }

  logoutUser() {
    localStorage.removeItem('loggedIn');
  }

  canActivate(): boolean {
    return localStorage.getItem('loggedIn') === 'true'; // todo find a way to fall back to LoginComponent if canActivate is false
  }
}
