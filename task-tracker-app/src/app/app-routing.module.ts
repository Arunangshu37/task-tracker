import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './Components/about/about.component';
import { AnalyticsComponent } from './Components/analytics/analytics.component';
import { AuthComponent } from './Components/auth/auth.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HomeComponent } from './Components/home/home.component';
import { LogoutComponent } from './Components/logout/logout.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { SaveTaskComponent } from './Components/save-task/save-task.component';
import { TaskComponent } from './Components/task/task.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "dashboard", component: DashboardComponent,
    children: [
      { path: "", redirectTo: "analytics", pathMatch: "full"},
      { path: "tasks", component:TaskComponent},
      { path: "save-task", component:SaveTaskComponent},
      { path: "logout", component:LogoutComponent},
      { path: "analytics", component: AnalyticsComponent },
      { path: "calendar", component: TaskComponent },
      { path: "profile", component:ProfileComponent },
    ]
  },
  { path: "login", component: AuthComponent},
  { path: "about", component: AboutComponent },
  { path: "logout", component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
