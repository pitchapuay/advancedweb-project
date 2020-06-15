import { Component, OnInit } from '@angular/core';
import { ThreadService } from 'src/app/serveices/thread.service';
import { sortBy } from 'sort-by-typescript';
import {Router} from '@angular/router'

@Component({
  selector: 'app-top-thread',
  templateUrl: './top-thread.component.html',
  styleUrls: ['./top-thread.component.css']
})
export class TopThreadComponent implements OnInit {
  threads: any
  cus = [];

  constructor(private th:ThreadService,private router:Router) { 
    this.onLoading();
  }

  ngOnInit(): void {
    this.onLoading();
  }
  onLoading(){
    try {
      this.th.getThread().subscribe(
        data =>{
          this.threads = data.sort(sortBy('-time'));
          
        },
        err =>{
          console.log(err)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
  readData(id){
    this.router.navigate(['/read',id]);
  }
}
