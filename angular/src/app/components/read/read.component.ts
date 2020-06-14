import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThreadService } from 'src/app/serveices/thread.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage'

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

  commentForm = new FormGroup({
    text: new FormControl('', ),
    
    idThread: new FormControl(this.ids,),
    user: new FormControl(this.local.get('id'),),

    
  });
  
  
  constructor(private route: ActivatedRoute,private th:ThreadService,private local:LocalStorageService) { }
   
  ngOnInit(): void {
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
