import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {
  
  constructor(private http : HttpClient) { }


  getCurrentProfileInformation(){
    return this.http.get(environment.baseUrl+"task-tracker-api/Profile/get-current-profile-info.php").pipe(
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
  logout(){
    return this.http.get(environment.baseUrl+"task-tracker-api/Profile/logout.php").pipe(
      map((response)=>{
        return response;
      })
    );
  }

  updateProfileInfo(profile:any){
    const headers = new HttpHeaders().set('Content-Type', []);
    return this.http.post(environment.baseUrl+"task-tracker-api/Profile/update-profile-info.php", profile,{headers, responseType:"text"}).pipe(
      map((response)=>{
        return response;
      })
    );
  }
}
