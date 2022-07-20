import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ɵassignExtraOptionsToRouter } from '@angular/router';
import { ProfileApiService } from 'src/app/Shared/profile-api.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private profileApi : ProfileApiService, private router:Router) {
  }

  ngOnInit(): void {
    this.profileApi.logout().subscribe((response:any)=>{
      if(response.responseCode == 200){
        console.log(response);
        const extras :NavigationExtras ={
          state:{
            message : response.message,
            messageType : "success"
          }
        }
        this.router.navigate(['login'], extras).then(()=>{
          window.location.reload();
        });
      } 
      else{
        this.router.navigate(['login']).then(()=>{
          window.location.reload();
        });
      }
      
    });
  }

}
