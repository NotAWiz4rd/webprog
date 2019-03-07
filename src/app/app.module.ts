import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {APP_ROUTES} from './app.routes';
import { LoginPageComponent } from './login-page/login-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    OverviewPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES, {
      scrollPositionRestoration: 'disabled',
      onSameUrlNavigation: 'reload'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
