import { Component, OnInit } from '@angular/core';
import { Priority, priorityList } from 'src/app/Models/Priority';
import { Status, statusList } from 'src/app/Models/Status';
import { TaskApiService } from 'src/app/Shared/task-api.service';
import Chart from 'chart.js/auto'
import { ProfileApiService } from 'src/app/Shared/profile-api.service';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  greetings : string ="";
  constructor(private taskApi : TaskApiService, private profileApi  :ProfileApiService) { 
    let dt = new Date();
    if(dt.getHours()>12 && dt.getHours() < 16)
    {
      this.greetings = "Good afternoon ";
    }
    else if(dt.getHours() >0 &&dt.getHours()<12){
      this.greetings = "Good morning ";
    }
    else if(dt.getHours() >16 &&dt.getHours()<21){
      this.greetings = "Good evening ";
    }
    else{
      this.greetings = "Hi ";
    }
    profileApi.getCurrentProfileInformation().subscribe((response:any)=>{
      this.greetings += response.profileInfo.firstName + " "  + response.profileInfo.lastName+"!";
    });
    
  }
  priorityData: any = {
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: [],
      }
    ]
  };
  statusData: any = {
    labels: [],
    datasets: [
      {
        label: 'Status Analysis',
        data: [],
        borderColor: "white",
        backgroundColor: "rgb(36, 57, 148)",
      },
    ]
  }
  ngOnInit(): void {
    this.taskApi.getTaskAnalytics().subscribe((response: any) => { 
      if (response.responseCode == 200) { 
        priorityList.forEach((entry:any) => { 
          let object = response.priorityAnalytics.find((item:any) => { return item.priority == entry.id });
          if(object != null){
            this.priorityData.labels.push(object.taskCount+" - "+entry?.label);
            this.priorityData.datasets[0].data.push(object.taskCount);
            this.priorityData.datasets[0].backgroundColor.push(entry?.color);
          }
          else{
            this.priorityData.labels.push("0 - "+entry?.label);
            this.priorityData.datasets[0].data.push(0);
            this.priorityData.datasets[0].backgroundColor.push(entry?.color);
          }
        });
        statusList.forEach((entry:any) => { 
          let object = response.statusAnalytics.find((item:any) => { return item.status == entry.id });
          if(object!=null){
            this.statusData.labels.push(entry?.label);
            this.statusData.datasets[0].data.push(object.taskCount);
          }else{
            this.statusData.labels.push(entry?.label);
            this.statusData.datasets[0].data.push(0);
          }
         
        });
      
        new Chart("priorityCount", {
          type: 'doughnut',
          data: this.priorityData,
          options: {
            plugins: {
              legend: {
                position: 'right',
              }
            }
          },
        });
  
        new Chart("statusCount", {
          type: 'bar',
          data: this.statusData,
          options: {
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Task status'
              }
            }
          },
        });
      }
    });
  }

  



}
