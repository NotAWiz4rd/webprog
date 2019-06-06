import {Component, NgModule, OnInit} from '@angular/core';
import {Globals} from '../../util/Globals';
import {LanguageService} from '../../services/language.service';
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ]
})

export class ContactPageComponent implements OnInit {
  name!: string;
  subject!: string;
  message!: string;

  constructor(public globals: Globals,
              public languageService: LanguageService) {
  }

  /**
   * Tries to send a mail to team@movie-hub.de with the given subject, name and message.
   */
  onSend() {
    window.location.href = `mailto:team@movie-hub.de?subject=${this.subject}&amp;body=Hi,%0D%0A%0D%0Amy%20name%20is%20${this.name},%0D%0A%0D%0A${this.message}`;
    console.log("sent mail");
  }

  ngOnInit() {
    this.globals.view = 'contact';
  }

}
