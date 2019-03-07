import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {APP_ROUTES} from './app.routes';
import {MainComponent} from './main/main.component';
import {HttpClientModule} from "@angular/common/http";
import {Globals} from "./globals";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {OverviewPageComponent} from "./pages/overview-page/overview-page.component";
import {FooterComponent} from "./components/footer/footer.component";
import {GetStaticTextPipe} from "./pipes/get-static-text.pipe";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    OverviewPageComponent,
    FooterComponent,
    MainComponent,
    GetStaticTextPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES, {
      scrollPositionRestoration: 'disabled',
      onSameUrlNavigation: 'reload'
    })
  ],
  providers: [
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
