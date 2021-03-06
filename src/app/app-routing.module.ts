import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './core/home/home.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { StateInitializedResolver } from './core/resolvers/state-initialized.resolver';
import { ProfileComponent } from './profile/profile.component';
import { GoalsTypeContainerComponent } from './goals/containers/goals-type-container/goals-type-container.component';
import { CalendarsContainerComponent } from './calendars/containers/calendars-container/calendars-container.component';
import { GoalsTabsContainerComponent } from './goals/containers/goals-tabs-container/goals-tabs-container.component';
import { SettingsComponent } from './settings/settings.component';
import { RegisterComponent } from './core/register/register.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard },
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard },
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    resolve: {
      StateInitializedResolver,
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'goals',
        component: GoalsTabsContainerComponent,
        children: [
          {
            path: '',
            redirectTo: 'daily',
            pathMatch: 'full',
          },
          {
            path: 'daily',
            component: GoalsTypeContainerComponent,
            data: { type: 'daily', animation: 'DailyTab' },
          },
          {
            path: 'weekly',
            component: GoalsTypeContainerComponent,
            data: { type: 'weekly', animation: 'WeeklyTab' },
          },
          {
            path: 'lifelong',
            component: GoalsTypeContainerComponent,
            data: { type: 'lifelong', animation: 'LifelongTab' },
          },
        ],
      },
      {
        path: 'calendar',
        component: CalendarsContainerComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
