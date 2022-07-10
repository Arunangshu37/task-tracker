import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Models/Task';
import { TaskApiService } from 'src/app/Shared/task-api.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  task: Task = new Task();
  taskList!: Task[];
  constructor(private taskApi: TaskApiService) { }

  ngOnInit(): void {
    this.taskApi.getAllTasks().subscribe((response: any) => { 
      console.log(response);
      if (response.responseCode == 200) {
        
        this.taskList = response.data;
      }
    });
  }

}
