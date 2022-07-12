import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/Models/Task';
import { Status, statusList } from 'src/app/Models/Status';
import { Priority } from 'src/app/Models/Priority';
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  status = Status;
  priority = Priority;
  statusList = statusList;

  @Output()
  deleteTaskEvent: EventEmitter<Task> = new EventEmitter();
  @Output()
  updateTaskEvent: EventEmitter<Task> = new EventEmitter();
  
  @Output()
  updateStatusEvent: EventEmitter<Task> = new EventEmitter();
  
 
  @Input()
  task: Task = new Task();
  constructor() { }

  ngOnInit(): void {
  }

  deleteTask(task: Task) {
    this.deleteTaskEvent.emit(task);
  }
  updateTask(task: Task) {
    this.updateTaskEvent.emit(task);
  }

  getStatusLabel(id: number):string { 
    let obj: any = this.statusList.filter((element: any) => { return id == element.id });

    return obj[0].label;
  }
  changeStatus(task:Task){
    this.updateStatusEvent.emit(task);
  }
}
