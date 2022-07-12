import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ProfileApiService } from 'src/app/Shared/profile-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private profileApi:ProfileApiService, private router:Router) {
    this.profileApi.getCurrentProfileInformation().subscribe((response:any)=>{
      if(response.responseCode != 200 ){
        const extras :NavigationExtras= {
          state:{
            "message" : response.message,
            "messageType": "error"
          }
        }
        this.router.navigate(['login'], extras);
      }
    });
  }

  ngOnInit(): void {
  }

}
