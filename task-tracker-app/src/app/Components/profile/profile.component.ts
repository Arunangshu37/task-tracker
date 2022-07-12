import { Component, OnInit } from '@angular/core';
import { ProfileApiService } from 'src/app/Shared/profile-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  imageData : any;
  image : any;
  profileData :any;
  constructor(private profileApi : ProfileApiService) { }

  ngOnInit(): void {
    this.profileApi.getFullProfileInformation().subscribe((response:any)=>{
      this.profileData = response.responseCode == 200 ? response.profileInfo : null;
      if(this.profileData!=null){
        this.image =this.profileData.imagePath
        console.log(this.image);
      }
    });
  }

  setImage(target:any){
    
    if(target.files.length>0){
      target.files[0]
    }
  }
}
