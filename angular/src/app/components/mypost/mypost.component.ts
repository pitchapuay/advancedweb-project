import { Component, OnInit } from '@angular/core';
import { ThreadService } from 'src/app/serveices/thread.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { sortBy } from 'sort-by-typescript';

@Component({
  selector: 'app-mypost',
  templateUrl: './mypost.component.html',
  styleUrls: ['./mypost.component.css']
})
export class MypostComponent implements OnInit {

  constructor(private th:ThreadService,private router:Router,private local:LocalStorageService){}

  threads:any
  ngOnInit(): void {
    this.onLoading();
  }
  onLoading(){
    try {
      this.th.getMyThread(this.local.get('id')).subscribe(
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
    this.local.set('idThread',id);
  }

  deleteThread(event){
    this.th.deleteThread(event).subscribe(
      data => {
        console.log(data)
        alert('delete added successfully');
        this.onLoading();
      },
      err => {
        console.log(err);
      });
  }
}
