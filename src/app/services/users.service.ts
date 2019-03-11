import {Injectable} from "@angular/core";
import {Globals} from "../util/Globals";
import {User} from "../util/User";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const DATABASE_PATH = 'https://api.mlab.com/api/1/databases/primetime-users/collections/users?apiKey=06Yem6JpYP8TSlm48U-Ze0Tb49Gnu0NA';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class UsersService {
  constructor(private globals: Globals,
              private http: HttpClient) {
  }

  loadUsersFromServer() {
    return this.http.get(DATABASE_PATH)
      .subscribe(data => {
        const userData = data as User[];
        console.log('Loaded user data.');
        this.globals.userData = userData;
      });
  }

  addUser(newUser: User): boolean {
    let success = true;

    this.globals.userData.forEach(user => {
      if (user.name === newUser.name) {
        success = false;
        console.log('User already exists - aborted creation.')
      }
    });

    if (!success) {
      return false;
    }

    newUser._id = this.globals.userData.length;

    this.http.post(DATABASE_PATH, JSON.stringify(newUser), httpOptions).subscribe(data => {
      console.log('New user has been created:');
      console.log(data);
      success = true;
    });
    this.loadUsersFromServer();
    return success;
  }
}
