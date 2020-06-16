import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class LikeService {

  likes:any 

  constructor(private http:HttpClient) { }

  addLike(like){
    return this.http.post<any>('http://localhost:3000/like/like',like)
    .pipe(map(data =>{
      return data;
    }));
  }

  getLike(){
    return this.http.get<any>('http://localhost:3000/like/like',)
    .pipe(map(data =>{
      if(data){
        this.likes = data;
        console.log(this.likes);
      }
      return this.likes;
    }));
  }

  getReadLike(id,user){
    return this.http.get<any>('http://localhost:3000/like/like/'+id+'/'+user,)
    .pipe(map(data =>{
      if(data){
        this.likes = data;
        console.log(this.likes);
      }
      return this.likes;
    }));
  }

  deleteLike(id){
    return this.http.delete<any>('http://localhost:3000/like/delete/'+id,)
    
  }
}
