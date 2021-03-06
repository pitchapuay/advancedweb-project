import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  threads: any;
  constructor(private http:HttpClient) { }
  addThread(thread){
    return this.http.post<any>('http://localhost:3000/thread/thread',thread)
    .pipe(map(data =>{
      return data;
    }));
  }

  getThread(){
    return this.http.get<any>('http://localhost:3000/thread/thread',)
    .pipe(map(data =>{
      if(data){
        this.threads = data;
        console.log(this.threads);
      }
      return this.threads;
    }));
  }

  getReadThread(id){
    return this.http.get<any>('http://localhost:3000/thread/thread/'+id,)
    .pipe(map(data =>{
      if(data){
        this.threads = data;
        console.log(this.threads);
      }
      return this.threads;
    }));
  }

  getMyThread(uid){
    return this.http.get<any>('http://localhost:3000/thread/mythread/'+uid,)
    .pipe(map(data =>{
      if(data){
        this.threads = data;
        console.log(this.threads);
      }
      return this.threads;
    }));
  }

  deleteThread(id){
    return this.http.delete<any>('http://localhost:3000/thread/delete/'+id,)
    
  }

  updateCount(id,count){
    return this.http.put<any>('http://localhost:3000/thread/count/'+id,count)
    
  }
}
