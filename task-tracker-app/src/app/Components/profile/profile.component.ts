import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/Models/Profile';
import { ProfileApiService } from 'src/app/Shared/profile-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  tempPassword:string ="";
  changePassword:boolean = false;
  changePasswordInputBoxDisabled:boolean =true;
  imageData : any;
  image : any;
  profileData: Profile =new Profile();
  formData :any = new FormData();
  constructor(private profileApi : ProfileApiService, private router:Router) {

    console.log(this.router.url);
    
  }

  ngOnInit(): void {
    if(this.router.url=="/signup")
    {
      this.changePasswordInputBoxDisabled =false;
      this.profileData= new Profile();
    }  
    else{
      
      this.profileApi.getCurrentProfileInformation().subscribe((response:any)=>{
        console.log(response);
        this.profileData = response.responseCode == 200 ? response.profileInfo : new Profile();
        if(this.profileData.id!=0){
          if(this.profileData.imagePath=="")
          {
            this.profileData.imagePath = new Profile().imagePath;
          }
          else{
            this.profileData.imagePath =environment.baseUrl+"task-tracker-api/"+this.profileData.imagePath
          }
          console.log(this.image);
        }else{
         
          console.log("no profile found in session");
        }
        
        this.profileData.token ="0";
      });
    }
  }
  setPasswodChange(){
    this.changePassword = !this.changePassword ;
    if(!this.changePassword)
    {
      this.changePasswordInputBoxDisabled = false;
      this.profileData.token = "1";
    }else{
      this.profileData.token = "0";
      this.changePasswordInputBoxDisabled = true;
    }
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
  processProfileSave(){
    if(this.tempPassword=="")
    {
      this.profileData.password = "";
    }
    if(this.tempPassword != this.profileData.password)
    {
      alert("Retyped password does not match with typed password!");
      console.log(this.tempPassword, this.profileData.password, "hello");
      return; 
    }
 
    this.formData.append("firstName", this.profileData.firstName);
    this.formData.append("lastName", this.profileData.lastName);
    this.formData.append("email", this.profileData.email);
    this.formData.append("token", this.profileData.token);
    this.formData.append("password", this.profileData.password);
    this.formData.append("profileId", this.profileData.id);
 

    this.profileApi.saveProfileInfo(this.formData).subscribe((response:any)=>{
      try{
        let jsonResponse = JSON.parse(response);
        alert(jsonResponse.message);   
      }catch(e)
      {
        
        console.log("An exception occured check here !",e, response );
      }
      
    })
  }
}
