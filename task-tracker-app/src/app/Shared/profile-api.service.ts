import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {
  
  constructor(private http : HttpClient) { }


  getCurrentProfileInformation(){
    return this.http.get(environment.baseUrl+"task-tracker-api/Profile/get-profile-info.php").pipe(
      map((response)=>{
        return response;
      })
    );
  }

  signInWithEmailAndPassword(profile:any){
    return this.http.post(environment.baseUrl+"task-tracker-api/Profile/authenticate-profile.php", profile).pipe(
      map((response)=>{
        return response;
      })
    );;
  }
  getFullProfileInformation(){
    return this.http.get(environment.baseUrl+"task-tracker-api/Profile/get-full-profile-info.php").pipe(
      map((response)=>{
        return response;
      })
    );
  }
}
