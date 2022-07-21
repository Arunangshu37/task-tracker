import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Marker } from 'src/app/Models/Marker';
import { MarkerApiService } from 'src/app/Shared/marker-api.service';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.css']
})
export class MarkerComponent implements OnInit {

  markerList: any;
  backUpList: any;
  page:any;
  marker: Marker = new Marker();
  constructor(private markerApi : MarkerApiService, private router:Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.getMarkers();
  }
  getMarkers(){
    this.markerApi.getMarkers().subscribe((response:any)=>{
      if(response.responseCode == 200){
        this.markerList = response.markers;
        this.backUpList = response.markers;
      }else{
        this.markerList = [];
      } 
    });
  }
  ngOnInit(): void {}

  clearForm(){
    this.marker = new Marker();
  }
  setData(marker:any){
    this.marker= marker;
  }

  deleteMarker(id :number ){
    if(confirm("Are you sure you want to delete this marker?"))
    {
      this.markerApi.removeMarker(id).subscribe((response:any)=>{
        alert(response.message);
        this.getMarkers();
      })
    }
   
  }
  saveMarker(marker:any){
    if(marker.id!=0)
    {
      this.markerApi.updateMarkerInfo(marker).subscribe((response:any)=>{
        if(response.resposeCode == 200)
        {
          alert(response.message);
          this.getMarkers();
          this.clearForm();
        }
        else{
          alert(response.message);
        }
      });
    }
    else
    {
      this.markerApi.addMarker(marker).subscribe((response:any)=>{
        this.getMarkers();
        alert(response.message);
      }); 
    }
    
  }

  searchMarker(target:any){
   this.markerList =  this.backUpList.filter((item:any)=>{return item.name.toLowerCase().indexOf(target.value.toLowerCase())!=-1 })
  }


}
