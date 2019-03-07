import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';

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

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  onLogin() {
    // load file with users
    this.http.get('../../../assets/users.json')
      .subscribe(data => {
        const userData = data as User[];
        console.log('loaded the following users: ' + data);
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

// most basic user data, corresponds to the structure in the users.json
export class User {
  name: string = '';
  password: string = '';
}

