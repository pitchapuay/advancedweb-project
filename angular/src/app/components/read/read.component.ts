import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThreadService } from 'src/app/serveices/thread.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage'
import { CommentService } from 'src/app/serveices/comment.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  threads:any
  ids:string;
  title:any
  text:any
  name:any
  avatar:any
  status = false;
  

  commentForms = new FormGroup({
    text: new FormControl('', ),
    
    idThread: new FormControl(this.local.get('idThread'),),
    idUser: new FormControl(this.local.get('id'),),
    profile: new FormGroup({
      name: new FormControl(this.local.get('name'),),
      age: new FormControl(this.local.get('age'),),
      avatar: new FormControl(this.local.get('avatar'),),
      
    }),
    
  });
  
  
  constructor(private route: ActivatedRoute,
    private th:ThreadService,
    private local:LocalStorageService,
    private cm:CommentService) { }
   
  ngOnInit(): void {
    if(this.local.get('id')!=null){
      this.status = true;
    }
    
    let id = this.route.snapshot.paramMap.get('id')
    this.ids = id;
    
    this.onLoading();
  }
  onLoading(){
    try {
      this.th.getReadThread(this.ids).subscribe(
        data =>{
          this.threads = data
          this.title = data[0]['title']
          this.text = data[0]['textArea']
          this.avatar = data[0]['profile']['avatar']
          this.name = data[0]['profile']['name']
          
          
          
        },
        err =>{
          console.log(err)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  addComment() {
    this.cm.addComent(this.commentForms.value).subscribe(
      data => {
        console.log(data)
        alert('comment added successfully');
        window.location.reload()
        this.commentForms.reset();
      },
      err => {
        console.log(err);
      });
  }
  like(){
    
  }
}
