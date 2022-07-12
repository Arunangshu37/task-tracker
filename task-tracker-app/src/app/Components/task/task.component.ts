import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TimeScale } from 'chart.js';
import { Priority, priorityList } from 'src/app/Models/Priority';
import { Status, statusList } from 'src/app/Models/Status';
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
  statusFilterEnable: boolean = false;
  priorityFilterEnable: boolean = false;
  statusList = statusList;
  status = Status;
  priority = Priority;
  priorityList = priorityList;

  constructor(private taskApi: TaskApiService, private router: Router) {
    this.getTasks();
  }


  getTasks() {
    this.taskApi.getAllTasks().subscribe((response: any) => {
      if (response.responseCode == 200) {
        this.backUpTaskList = response.data;
        this.taskList = response.data;
      }
    });
  }

  ngOnInit(): void {

  }

  processDeleteTaskRequest(task: Task) {
    if (confirm("Are you sure you want to delete this task.")) {
      this.taskApi.deleteTask(task.id).subscribe((response: any) => {
        if (response.responseCode == 200) {
          alert(response.message);
          this.getTasks();
        } else {
          alert(response.message);
        }
      })
    }
  }
  setUpTaskForm(task: Task) {
    console.log("Sending task data to save-task route... ", task);
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


  reset() {
    this.taskList = this.backUpTaskList;
  }

  filterTaskByStatus(target: any) {
    if (!this.priorityFilterEnable) {
      this.taskList = this.backUpTaskList;
      console.log("in here");
    }
    this.taskList = this.taskList.filter((item) => { return item.status == target.value  });
  }

  filterTaskByPriority(target: any) 
  {
    if (!this.statusFilterEnable) {
      this.taskList = this.backUpTaskList
    }
    this.taskList = this.taskList.filter((item) => { return item.priority == target.value });
  }

  searchTask(token: any) {
    let value: any = token.value.toLowerCase();
    this.taskList = this.backUpTaskList.filter((item) => {
      return item.description.toLowerCase().indexOf(value) != -1 ||
        item.title.toLowerCase().indexOf(value) != -1 ||
        item.id == (!isNaN(value) ? value : 0);
    });
  }

  updateStatus(task: Task) {
    this.taskApi.putTask(task).subscribe(response => console.log(response.message));
  }

}
