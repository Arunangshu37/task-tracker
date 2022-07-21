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
  markedDays = {
    data:[],
    getMarkersForDay: function(day:number):any{
      return this.data.filter((item:any)=>{ return item.day == day });
    }
  }
  
  marker: Marker = new Marker();
  markers!:any;
  markedDates!:any;

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
      this.markedDays.data = response.responseCode == 200 ? response.markedDays : null;
      if(this.calendar == null ){
        alert(response.message);
      }
       console.log(this.markedDays);
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
    let date  = this.year+"-"+(this.month+1)+"-"+this.day;
    // get the markers for this day from database
    this.calendarApi.getMarkedDates(date).subscribe((response:any)=>{
      this.markedDates = response.markedDates;
     
    });
    
  }

  removeMarkerFromDate(instanceId : number){
   if(confirm("Are you sure you want to remove this marker fro this date ? ")){
    this.calendarApi.removeMarkerFromDate(instanceId).subscribe((response:any)=>{
      this.renderDayActivity(this.day);
      this.setCalendar(this.month+1, this.year);
      alert(response.message);
    });
   }
  }

  addMarker(target:any){
    console.log(target.value);
    if(target.value!="-")
    {
      let date  = this.year+"-"+(this.month+1)+"-"+this.day;
      this.calendarApi.markDate(date, target.value).subscribe((response:any)=>{
        this.renderDayActivity(this.day);
        this.setCalendar(this.month+1, this.year);
        alert(response.message);
      });
    }else{
      alert("Oops! You cannot assign empty marker to a date.");
    }

  }

  getMarkers(){
    this.markerApi.getMarkers().subscribe((response:any)=>{
      if(response.responseCode == 200)
      {
        this.markers = response.markers;
      }
      else
      {
        this.markers = null; 
      }
    })
  }


}
