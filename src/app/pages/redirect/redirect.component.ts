import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NavigationService} from "../../services/navigation.service";
import {Globals} from "../../util/Globals";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements  AfterViewInit {
  constructor( private navigationService: NavigationService) {
  }

  ngAfterViewInit() {
    this.navigationService.navigateToView(window.location.pathname.replace('redirect', ''));
  }

}
