import { Component, OnInit } from '@angular/core';
import { ThreadService } from 'src/app/serveices/thread.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { sortBy } from 'sort-by-typescript';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  threads: any
  cus = [];

  constructor(private th:ThreadService,private router:Router,private local:LocalStorageService) { 
    this.onLoading();
  }

  ngOnInit(): void {
    this.onLoading();
  }
  onLoading(){
    try {
      this.th.getThread().subscribe(
        data =>{
          this.threads = data.sort(sortBy('-like'));
          
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
    this.local.set('idThread',id);
  }
}
