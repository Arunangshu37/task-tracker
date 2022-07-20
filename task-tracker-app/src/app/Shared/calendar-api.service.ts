import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarApiService {

  constructor(private http: HttpClient) { }

  getCalendar(month:number, year:number){
    return this.http.get( environment.baseUrl + "task-tracker-api/get-calendar.php?month="+month+"&year="+year).pipe(
      map((response)=>{
        return response;
      })
    );
  }
  getMarkedDates(date:string){
    return this.http.get(environment.baseUrl + "task-tracker-api/get-marked-dates.php?date="+date).pipe(
      map((response)=>{
        return response;
      })
    );
  }
  markDate(date:string, markerId:number){
    let data={
      date : date,
      markerId : markerId
    }
    return this.http.post(environment.baseUrl + "task-tracker-api/mark-date.php", data).pipe(
      map((response)=>{
        return response;
      })
    );
  }
  removeMarkerFromDate(instanceId:number){
    const options = {
      headers: new HttpHeaders({
        'Content-type':'application/json'
      }),
      body:{
        instanceId : instanceId
      }
    }
    return this.http.post(environment.baseUrl + "task-tracker-api/remove-marker-from-date.php", options).pipe(
      map((response)=>{
        return response;
      })
    );
  }


}
