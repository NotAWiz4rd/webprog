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
import {Globals} from "./util/Globals";
import {HeaderComponent} from "./components/header/header.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {AuthService} from "./services/auth.service";
import {LanguageService} from "./services/language.service";
import {NavigationService} from "./services/navigation.service";
import {GetMovieDescriptionPipe} from "./pipes/get-movie-description.pipe";
import {MoviesResolver} from "./resolvers/movies.resolver";
import {MoviesService} from "./services/movies.service";
import {PlayerComponent} from "./pages/player/player.component";
import {MoviePreviewComponent} from "./components/movie-preview/movie-preview.component";
import {GenreChooserComponent} from "./components/genre-chooser/genre-chooser.component";
import {GetFilteredMoviesPipe} from "./pipes/get-filtered-movies.pipe";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    OverviewPageComponent,
    FooterComponent,
    GetStaticTextPipe,
    HeaderComponent,
    NotFoundComponent,
    GetMovieDescriptionPipe,
    PlayerComponent,
    MoviePreviewComponent,
    GenreChooserComponent,
    GetFilteredMoviesPipe
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
    AuthService,
    LanguageService,
    NavigationService,
    MoviesService,
    MoviesResolver,
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
