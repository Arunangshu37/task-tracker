import { Component, OnInit } from '@angular/core';
import { ProfileApiService } from 'src/app/Shared/profile-api.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  isLoggedIn: boolean =false;
  constructor(private profileApi: ProfileApiService) {

    this.profileApi.getCurrentProfileInformation().subscribe((response:any)=>{
      console.log(response);
      if(response.responseCode == 200){
        this.isLoggedIn = true;
      }
      else{
        this.isLoggedIn = false;

      }
      
    })
   }

  ngOnInit(): void {
  }

}
