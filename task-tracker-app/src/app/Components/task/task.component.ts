import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Priority } from 'src/app/Models/Priority';
import { Status } from 'src/app/Models/Status';
import { Task } from 'src/app/Models/Task';
import { TaskApiService } from 'src/app/Shared/task-api.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  page: any;
  task: Task = new Task();
  taskList!: Task[];
  backUpTaskList!: Task[];
  
  constructor(private taskApi: TaskApiService, private router:Router) { }


  getTasks() { 
    this.taskApi.getAllTasks().subscribe((response: any) => { 
      console.log(response);
      if (response.responseCode == 200) {
        this.backUpTaskList = response.data;
        this.taskList = response.data;
      }
    });
  }

  ngOnInit(): void {
    this.getTasks()
  }

  processDeleteTaskRequest(task: Task)
  { 
    if (confirm("Are you sure you want to delete this task."))
    { 
      this.taskApi.deleteTask(task.id).subscribe((response:any) => { 
        if (response.responseCode == 200) { 
          alert(response.message);
          this.getTasks();
        } else
        {
          alert(response.message);
        }
      })  
    }
  }
  setUpTaskForm(task:Task) { 
    console.log("Sending task data to save-task route... ",task);
    const extras: NavigationExtras = { 
      state: {
        task
      }
    }
    this.router.navigate(['dashboard/save-task'], extras);
  }


  sortData(token: any) { 
    switch (token.value) { 
      case "dateAsc": {
        this.taskList = this.backUpTaskList.sort((prev: any, next: any) => {
          let prevDate: any = new Date(prev.createdOn);
          let nextDate: any = new Date(next.createdOn)
          return prevDate - nextDate;
        });
        break;
      }
      case "dateDesc": {
        this.taskList = this.backUpTaskList.sort((prev: any, next: any) => {
          let prevDate: any = new Date(prev.createdOn);
          let nextDate: any = new Date(next.createdOn);
          return nextDate - prevDate;
        });
        break;
      }
    }
  }

  filterData(token:any) { 
    switch (token.value) { 
      case "high": {
        this.taskList = this.backUpTaskList.filter((item) => {return item.priority == Priority.High.id});
        break;
      }
      case "medium": {
        this.taskList = this.backUpTaskList.filter((item) => {return item.priority == Priority.Medium.id});
        break;
      }
      case "low": {
        this.taskList = this.backUpTaskList.filter((item) => {return item.priority == Priority.Low.id});
        break;
      }
      case "new": {
        this.taskList = this.backUpTaskList.filter((item) => {return item.status == Status.New.id});
        break;
      }
      case "ongoing": {
        this.taskList = this.backUpTaskList.filter((item) => {return item.status == Status.OnGoing.id});
        break;
      }
      case "onhold": {
        this.taskList = this.backUpTaskList.filter((item) => {return item.status == Status.OnHold.id});
        break;
      }
      case "complete": {
        this.taskList = this.backUpTaskList.filter((item) => {return item.status == Status.Complete.id});
        break;
      }
      case "all": {
        this.taskList = this.backUpTaskList;
        break;
      }
     
    }
  }

  searchTask(token: any) { 
    let value: any = token.value.toLowerCase();
    this.taskList = this.backUpTaskList.filter((item) =>{
      return item.description.toLowerCase().indexOf(value) != -1 ||
        item.title.toLowerCase().indexOf(value) != -1 ||
        item.id == (!isNaN(value) ? value : 0);
    });
  }

}
