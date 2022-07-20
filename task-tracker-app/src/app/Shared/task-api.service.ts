import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  constructor(private http : HttpClient) { }
 
  


  getAllTasks() { 
    return this.http.get(environment.baseUrl+"task-tracker-api/Task/get-all-tasks.php").pipe(
      map(function (response): Object {
        return response;
      })
    );
  }
  getTaskAnalytics() { 
    return this.http.get(environment.baseUrl+"task-tracker-api/Task/get-task-analytics.php").pipe(
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
    return this.http.post(environment.baseUrl+"task-tracker-api/Task/delete-task.php", options).pipe(
      map(function (response): Object {
        return response;
      })
    );
  }
  postTask(task:any) { 
    return this.http.post(environment.baseUrl+"task-tracker-api/Task/save-task.php", task).pipe(
      map((response: any) => { 
        return response;
      })
    );
  }
  putTask(task:any) { 
    return this.http.post(environment.baseUrl+"task-tracker-api/Task/update-task.php", task).pipe(
      map((response: any) => { 
        return response;
      })
    );
  }
}
