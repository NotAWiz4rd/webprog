import {OverviewPageComponent} from "./pages/overview-page/overview-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {AuthService} from "./util/auth.service";
import {NotFoundComponent} from "./components/not-found/not-found.component";

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
    path: '**',
    component: NotFoundComponent
  }
];
