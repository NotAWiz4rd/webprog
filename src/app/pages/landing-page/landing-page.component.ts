import { Component, OnInit } from '@angular/core';
import {NavigationService} from '../../services/navigation.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  join: string = 'JOIN NOW';

  constructor(private navigationService: NavigationService) {
  }

  ngOnInit() {
  }

  clickJoin() {
      this.navigationService.navigateToView('login');
  }

}
