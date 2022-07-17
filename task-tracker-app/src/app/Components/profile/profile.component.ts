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
  formData :any = new FormData();
  constructor(private profileApi : ProfileApiService) { }

  ngOnInit(): void {
    this.profileApi.getCurrentProfileInformation().subscribe((response:any)=>{
      console.log(response);
      this.profileData = response.responseCode == 200 ? response.profileInfo : null;
      if(this.profileData!=null){
        this.profileData.imagePath =environment.baseUrl+"task-tracker-api/"+this.profileData.imagePath
        console.log(this.image);
      }
    });
  }

  setImage(target:any): void{
    
    if(target.files.length>0){
      this.formData.append("image", target.files[0]);
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
  
 
    this.formData.append("firstName", this.profileData.firstName);
    this.formData.append("lastName", this.profileData.lastName);
    this.formData.append("email", this.profileData.email);
    this.formData.append("token", 0);
    this.profileApi.updateProfileInfo(this.formData).subscribe((response:any)=>{
      try{
        let jsonResponse = JSON.parse(response);
        alert(jsonResponse.message);   
      }catch(e)
      {
        console.log("An exception occured check here !",e );
      }
      
    })
  }
}
