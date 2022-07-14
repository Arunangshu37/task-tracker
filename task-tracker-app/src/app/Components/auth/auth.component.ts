import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/Models/Profile';
import { ProfileApiService } from 'src/app/Shared/profile-api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  message : string = "";
  messageType : string ="";
  profile: Profile =new Profile();
  constructor(private profileApi : ProfileApiService, private router: Router) {
    let message = this.router.getCurrentNavigation()?.extras?.state?.['message'];
    let messageType = this.router.getCurrentNavigation()?.extras?.state?.['messageType'];
    if(message!=null){
      this.message = message;
      this.messageType = messageType;
    }
  }

  ngOnInit(): void {
  }
  authenticateProfile(){
    this.profileApi.signInWithEmailAndPassword(this.profile).subscribe((response:any)=>{
      if(response.responseCode== 200){
        console.log(response.message, response.profileInfo);
        this.router.navigate(['dashboard']).then(()=>{
          window.location.reload();
        });
      }
      else{
        console.log(response.message);
        this.message = response.message;
        this.messageType = "error";
      }
    })
  }
}
