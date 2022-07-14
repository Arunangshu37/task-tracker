import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './Components/navigation-bar/navigation-bar.component';
import { NavigationPanelComponent } from './Components/navigation-panel/navigation-panel.component';
import { HomeComponent } from './Components/home/home.component';
import { AuthComponent } from './Components/auth/auth.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { TaskComponent } from './Components/task/task.component';
import { SaveTaskComponent } from './Components/save-task/save-task.component';
import { TaskItemComponent } from './Components/task-item/task-item.component';
import { LogoutComponent } from './Components/logout/logout.component';
import { AnalyticsComponent } from './Components/analytics/analytics.component';
import { AboutComponent } from './Components/about/about.component';
import { HttpClientModule} from "@angular/common/http"
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileComponent } from './Components/profile/profile.component';
import { CalendarComponent } from './Components/calendar/calendar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    NavigationPanelComponent,
    HomeComponent,
    AuthComponent,
    DashboardComponent,
    TaskComponent,
    SaveTaskComponent,
    TaskItemComponent,
    LogoutComponent,
    AnalyticsComponent,
    AboutComponent,
    ProfileComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
