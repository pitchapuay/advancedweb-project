import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  comments:any

  constructor(private http:HttpClient) { }

  addComent(comment){
    return this.http.post<any>('http://localhost:3000/comment/comment',comment)
    .pipe(map(data =>{
      return data;
    }));
  }

  getComent(){
    return this.http.get<any>('http://localhost:3000/comment/comment',)
    .pipe(map(data =>{
      if(data){
        this.comments = data;
        console.log(this.comments);
      }
      return this.comments;
    }));
  }

  getReadComment(id){
    return this.http.get<any>('http://localhost:3000/comment/comment/'+id,)
    .pipe(map(data =>{
      if(data){
        this.comments = data;
        console.log(this.comments);
      }
      return this.comments;
    }));
  }
}

