import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage'
import { ThreadService } from 'src/app/serveices/thread.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  threadType: string[] = ['เทคโนโลยี', 'ความรัก', 'ลี้ลับ', 'การเรียน','การงาน','ปัญหาชีวิต'];
  threadForm = new FormGroup({
    title: new FormControl('', ),
    textArea: new FormControl('', ),
    idThread: new FormControl('',),
    filter: new FormControl('',),
    idUser: new FormControl(this.local.get('id'),),

    
  });
  constructor(private local:LocalStorageService,private th:ThreadService) { }

  ngOnInit(): void {
  }
  addThread() {
    this.th.addThread(this.threadForm.value).subscribe(
      data => {
        console.log(data)
        alert('Thread added successfully');
        this.threadForm.reset();
      },
      err => {
        console.log(err);
      });
  }

}
