import { Component, OnInit } from '@angular/core';
import { Priority, priorityList } from 'src/app/Models/Priority';
import { Status, statusList } from 'src/app/Models/Status';
import { TaskApiService } from 'src/app/Shared/task-api.service';
import Chart from 'chart.js/auto'
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  constructor(private taskApi : TaskApiService) { }
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
          this.priorityData.labels.push(entry?.label);
          this.priorityData.datasets[0].data.push(object.taskCount);
          this.priorityData.datasets[0].backgroundColor.push(entry?.color);
        });
        statusList.forEach((entry:any) => { 
          let object = response.statusAnalytics.find((item:any) => { return item.status == entry.id });
          this.statusData.labels.push(entry?.label);
          this.statusData.datasets[0].data.push(object.taskCount);
         
        });
      }
      


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
    });
  }



}
