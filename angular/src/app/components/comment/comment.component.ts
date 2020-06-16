import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/serveices/comment.service';
import { LocalStorageService } from 'angular-web-storage';
import { sortBy } from 'sort-by-typescript';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comments:any
  constructor(private cm:CommentService,private local:LocalStorageService,) {
    this.onLoading();
   }

  ngOnInit(): void {
    this.onLoading()
  }
  onLoading(){
    try {
      this.cm.getReadComment(this.local.get('idThread')).subscribe(
        data =>{
          this.comments = data.sort(sortBy('-time'));
          
          
          },
        err =>{
          console.log(err)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
}
