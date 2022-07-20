import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarkerApiService {

  constructor(private http:HttpClient) { }

  addMarker(data:any){
    return this.http.post(environment.baseUrl+"task-tracker-api/Marker/save-marker.php", data).pipe(
      map((response)=>{
        return response;
      })
    );
  }
  removeMarker(markerId: number){
    const options= {
      headers : new HttpHeaders({
        'Content-type': "application/json",
      }),
      body:{
        markerId : markerId
      }
    }
    return this.http.post(environment.baseUrl+"task-tracker-api/Marker/delete-marker.php", options).pipe(
      map((response)=>{
        return response;
      })
    );
  }
  updateMarkerInfo(data:any){
    return this.http.post(environment.baseUrl+"task-tracker-api/Marker/update-marker.php", data).pipe(
      map((response)=>{
        return response;
      })
    );
  }
  getMarkers(){
    return this.http.get(environment.baseUrl+"task-tracker-api/Marker/get-all-markers.php").pipe(
      map((response)=>{
        return response;
      })
    );
  }
}
