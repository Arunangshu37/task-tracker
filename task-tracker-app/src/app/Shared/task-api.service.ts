import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  deleteTask(id:number) { 
    const options = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
      body: {
        taskId: id
      }
    }
    return this.http.delete("http://localhost/task-tracker/task-tracker-api/Task/delete-task.php", options).pipe(
      map(function (response): Object {
        return response;
      })
    );
  }
  postTask(task:any) { 
    return this.http.post("http://localhost/task-tracker/task-tracker-api/Task/save-task.php", task).pipe(
      map((response: any) => { 
        return response;
      })
    );
  }
  putTask(task:any) { 
    return this.http.put("http://localhost/task-tracker/task-tracker-api/Task/save-task.php", task).pipe(
      map((response: any) => { 
        return response;
      })
    );
  }
}
