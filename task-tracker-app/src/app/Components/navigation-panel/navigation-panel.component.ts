import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileApiService } from 'src/app/Shared/profile-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.css']
})
export class NavigationPanelComponent implements OnInit {

  imagePath : string = "";
  userName  : string = "";
  constructor(private router:Router, private profileApi : ProfileApiService) { 
  this.profileApi.getCurrentProfileInformation().subscribe((response:any)=>{
    this.imagePath =environment.baseUrl +"task-tracker-api/"+ response.profileInfo.imagePath;
    this.userName = response.profileInfo.firstName +" "+ response.profileInfo.lastName;
  });
  }

  ngOnInit(): void {
  }

  navigateTo(path: string) { 
    console.log(path);
    this.router.navigate(["dashboard/" + path]);
    return false;
  }
}
