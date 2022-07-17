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


}
