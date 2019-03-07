import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {APP_ROUTES} from './app.routes';
import {HttpClientModule} from "@angular/common/http";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {OverviewPageComponent} from "./pages/overview-page/overview-page.component";
import {FooterComponent} from "./components/footer/footer.component";
import {GetStaticTextPipe} from "./pipes/get-static-text.pipe";
import {AuthService} from "./util/auth.service";
import {LanguageService} from "./util/language.service";
import {Globals} from "./util/globals";
import {HeaderComponent} from "./components/header/header.component";
import {NavigationService} from "./util/navigation.service";
import {NotFoundComponent} from "./components/not-found/not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    OverviewPageComponent,
    FooterComponent,
    GetStaticTextPipe,
    HeaderComponent,
    NotFoundComponent
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
    Globals,
    AuthService,
    LanguageService,
    NavigationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
