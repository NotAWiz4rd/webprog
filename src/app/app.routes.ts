import {OverviewPageComponent} from "./pages/overview-page/overview-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {AuthService} from "./services/auth.service";
import {MoviesResolver} from "./resolvers/movies.resolver";
import {PlayerComponent} from "./pages/player/player.component";
import {MyListComponent} from "./components/my-list/my-list.component";
import {ImpressumPageComponent} from './pages/impressum-page/impressum-page.component';

export const APP_ROUTES = [
  {
    path: '',
    component: LoginPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'impressum',
    component: ImpressumPageComponent
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
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
