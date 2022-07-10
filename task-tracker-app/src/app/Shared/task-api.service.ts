import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  constructor(private http : HttpClient) { }


  getAllTasks() { 
    return this.http.get("http://localhost/task-tracker/task-tracker-api/Task/get-all-tasks.php").pipe(
      map(function (response): Object {
        return response;
      })
    );
  }

  getTaskAnalytics() { 
    return this.http.get("http://localhost/task-tracker/task-tracker-api/Task/get-task-analytics.php").pipe(
      map(function (response): Object {
        return response;
      })
    );
  }
}
