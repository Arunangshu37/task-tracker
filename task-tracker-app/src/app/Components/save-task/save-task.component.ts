import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Models/Task';
import { TaskApiService } from 'src/app/Shared/task-api.service';
import { statusList } from 'src/app/Models/Status';
import { priorityList } from 'src/app/Models/Priority';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css']
})
export class SaveTaskComponent implements OnInit {

  task: Task = new Task();
  statusList  = statusList
  priorityList  = priorityList
  constructor(private taskApi: TaskApiService, private router: Router) {
    let task: any = this.router.getCurrentNavigation()?.extras.state?.['task'];
    if (task!=null) {
      this.task = task;
      console.log(this.task);
    } else {
      this.task = new Task();
    }
  }

  ngOnInit(): void {
  }
  saveTaskData(taskForm: any) { 
    if (this.task.id != 0) {
      this.taskApi.putTask(this.task).subscribe((response) => alert(response.message));
    } else {
      console.log(this.task.createdOn); 
      this.taskApi.postTask(this.task).subscribe((response) => alert(response.message));
    }
    taskForm.resetForm();
  }
}
