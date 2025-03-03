import {OverviewPageComponent} from "./pages/overview-page/overview-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {AuthService} from "./services/auth.service";
import {MoviesResolver} from "./resolvers/movies.resolver";
import {PlayerComponent} from "./pages/player/player.component";
import {MyListComponent} from "./components/my-list/my-list.component";
import {ImpressumPageComponent} from './pages/impressum-page/impressum-page.component';
import {RegisterPageComponent} from "./pages/register-page/register-page.component";
import {ContactPageComponent} from "./pages/contact-page/contact-page.component";
import {AgbPageComponent} from "./pages/agb-page/agb-page.component";
import {LandingPageComponent} from "./pages/landing-page/landing-page.component";
import {RedirectComponent} from "./pages/redirect/redirect.component";

export const APP_ROUTES = [
  {
    path: '',
    component: LandingPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'land',
    component: LandingPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'impressum',
    component: ImpressumPageComponent
  },
  {
    path: 'agb',
    component: AgbPageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: 'redirect',
    component: RedirectComponent,
    canActivate: [AuthService],
    children: [
      {path: '**',
        component: RedirectComponent
      }
    ]
  },
  {
    path: 'overview',
    component: OverviewPageComponent,
    canActivate: [AuthService]
  },
  {
    path: 'my-list',
    component: MyListComponent,
    canActivate: [AuthService]

  },
  {
    path: 'watch/:movieKey',
    component: PlayerComponent,
    canActivate: [AuthService],
    resolve: {
      movie: MoviesResolver
    },
    children: [
      {
        path: 'series/:seasonKey/:episodeKey',
        component: PlayerComponent,
        canActivate: [AuthService]
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
