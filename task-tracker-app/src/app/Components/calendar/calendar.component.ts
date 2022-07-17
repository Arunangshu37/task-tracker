import { Component, OnInit } from '@angular/core';
import { Marker } from 'src/app/Models/Marker';
import { CalendarApiService } from 'src/app/Shared/calendar-api.service';
import { MarkerApiService } from 'src/app/Shared/marker-api.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private calendarApi: CalendarApiService, private markerApi : MarkerApiService) { }

  //constants
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  weekName = ['Sun', 'Mon',  'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  month : number = new Date().getMonth();
  year : number = new Date().getFullYear();
  day:any;
  
  calendar!:any;
  marker: Marker = new Marker();
  markers!:any;
  dayMarkers!:any;

  prevMonth :string = "";
  nextMonth : string = "";

  ngOnInit(): void 
  {
    this.setCalendar(this.month+1, this.year);
    this.setBoundaryMonths(this.month);  
    this.getMarkers();
  } 
  setBoundaryMonths(month:number)
  {
   if(month == 11)
   {
      this.nextMonth = this.monthNames[0]+" - "+(this.year+1);
      this.prevMonth = this.monthNames[10];
      return;
   }
   if(month == 0)
   {
      this.prevMonth = this.monthNames[11]+" - "+(this.year-1);
      this.nextMonth = this.monthNames[1]
      return;
   }
   this.nextMonth = this.monthNames[month+1];
   this.prevMonth = this.monthNames[month-1];
  }
  setCalendar(month:number, year:number){
    this.calendarApi.getCalendar(month, year).subscribe((response:any)=>{
      this.calendar =  response.responseCode==200 ?  response.calendar : null;
      if(this.calendar == null ){
        alert(response.message);
      }
    })
  }

  switchMonth(token: string){
   
    if(token=='p')
    {
      this.month -=1;
      if(this.month==-1) // means current month is January
      {
        this.month  = 11;
        this.year -= 1;
      }    
    }
    else
    {
      this.month+=1;
      if(this.month==12) // means current month is December
      {
        this.month  = 0;
        this.year += 1;
      }
    }
    this.setCalendar(this.month+1, this.year);
    this.setBoundaryMonths(this.month);
  }

  renderDayActivity(day:any){
    this.day = day;
    // get the markers for this day from database
    
  }
  
  getMarkers(){
    this.markerApi.getMarkers().subscribe((response:any)=>{
      if(response.responseCode == 200)
      {
        this.markers = response.markers;
      }else{
        this.markers = null; 
      }
    })
  }

}
