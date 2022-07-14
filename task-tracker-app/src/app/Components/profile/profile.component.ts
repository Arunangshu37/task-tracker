import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/Models/Profile';
import { ProfileApiService } from 'src/app/Shared/profile-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  imageData : any;
  image : any;
  profileData: Profile =new Profile();
  constructor(private profileApi : ProfileApiService) { }

  ngOnInit(): void {
    this.profileApi.getFullProfileInformation().subscribe((response:any)=>{
      this.profileData = response.responseCode == 200 ? response.profileInfo : null;
      if(this.profileData!=null){
        this.profileData.imagePath =environment.baseUrl+this.profileData.imagePath
        console.log(this.image);
      }
    });
  }

  setImage(target:any){
    
    if(target.files.length>0){
      console.log("file has been selected", target.files);
      this.profileData.image = target.files;
      let fr = new FileReader();
        fr.onload = setData;
        let  img:any = document.getElementById("img");
        function setData() {
           img.src = fr.result;
        }

        fr.readAsDataURL(target.files[0]);
     
    }
  }
  processProfileUpdate(){
    this.profileApi.updateProfileInfo(this.profileData).subscribe((response:any)=>{
      console.log(response);
    })
  }
}
