import {OverviewPageComponent} from "./pages/overview-page/overview-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {AuthService} from "./services/auth.service";
import {MoviesResolver} from "./resolvers/movies.resolver";
import {PlayerComponent} from "./pages/player/player.component";
import {MyListComponent} from "./components/my-list/my-list.component";

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
