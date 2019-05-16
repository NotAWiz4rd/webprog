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
import {UsersService} from "./services/users.service";
import {GetFilteredMoviesPipe} from "./pipes/get-filtered-movies.pipe";
import {BasicButtonComponent} from "./components/basic-button/basic-button.component";
import {MyListComponent} from './components/my-list/my-list.component';
import {MovieSuggestionsComponent} from './components/movie-suggestions/movie-suggestions.component';
import {MovieDescriptionComponent} from './components/movie-description/movie-description.component';
import {ImpressumPageComponent} from './pages/impressum-page/impressum-page.component';
import {LogoComponent} from "./components/logo/logo.component";
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {ContactPageComponent} from './pages/contact-page/contact-page.component';
import {FormsModule} from "@angular/forms";

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
    GetFilteredMoviesPipe,
    BasicButtonComponent,
    MyListComponent,
    MovieSuggestionsComponent,
    MovieDescriptionComponent,
    ImpressumPageComponent,
    MovieSuggestionsComponent,
    LogoComponent,
    RegisterPageComponent,
    ContactPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES, {
      scrollPositionRestoration: 'disabled',
      onSameUrlNavigation: 'reload'
    }),
    FormsModule
  ],
  providers: [
    AuthService,
    LanguageService,
    NavigationService,
    UsersService,
    MoviesService,
    MoviesResolver,
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
