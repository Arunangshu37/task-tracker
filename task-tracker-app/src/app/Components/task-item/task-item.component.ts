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

  @Output()
  deleteEvent: EventEmitter<Task> = new EventEmitter();
  @Output()
  updateEvent: EventEmitter<Task> = new EventEmitter();
  
  status = Status;
  priority = Priority;
  statusList = statusList;
  @Input()
  task: Task = new Task();
  constructor() { }

  ngOnInit(): void {
  }

  deleteTask(task: Task) {
    this.deleteEvent.emit(task);
  }
  updateTask(task: Task) {
    this.updateEvent.emit(task);
  }

  getStatusLabel(id: number):string { 
    let obj: any = this.statusList.filter((element: any) => { return id == element.id });

    return obj[0].label;
  }
}
