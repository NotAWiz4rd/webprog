import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";

@Injectable()
export class AuthService implements CanActivate {
  constructor() {
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
