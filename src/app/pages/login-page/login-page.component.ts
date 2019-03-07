import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from "../../globals";
import {User} from "../../util/User";

const USERFILE_PATH = '../../../assets/users.json';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  @Output()
  correctLogin: EventEmitter<boolean> = new EventEmitter();

  loginName: string = '';
  loginPassword: string = '';

  constructor(private http: HttpClient, private globals: Globals) {
  }

  ngOnInit() {
  }

  onLogin() {
    // load file with users
    this.http.get(USERFILE_PATH)
      .subscribe(data => {
        const userData = data as User[];
        console.log('Loaded user data.');
        this.lookForMatch(userData);
      });
  }

  mailInputChange(mail: string) {
    this.loginName = mail;
  }

  passwordInputChange(password: string) {
    this.loginPassword = password;
  }

  private lookForMatch(data: User[]) {
    data.forEach(user => {
      if (user.name === this.loginName && user.password === this.loginPassword) {
        console.log('Correct login for user ' + this.loginName + ' received.');
        this.correctLogin.emit(true);
      }
    });
  }
}

