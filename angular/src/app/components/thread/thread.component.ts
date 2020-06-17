import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage'
import { ThreadService } from 'src/app/serveices/thread.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  threadType: string[] = ['เทคโนโลยี', 'ความรัก', 'ลี้ลับ', 'การเรียน', 'การงาน', 'ปัญหาชีวิต'];
  threadForm = new FormGroup({
    like: new FormControl(0),
    title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    textArea: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]),
    filter: new FormControl('', [Validators.required]),
    idUser: new FormControl(this.local.get('id'),),
    profile: new FormGroup({
      name: new FormControl(this.local.get('name'),),
      age: new FormControl(this.local.get('age'),),
      avatar: new FormControl(this.local.get('avatar'),),

    }),

  });
  constructor(private local: LocalStorageService, private th: ThreadService) { }

  ngOnInit(): void {
  }
  addThread() {
    this.th.addThread(this.threadForm.value).subscribe(
      data => {
        console.log(data)
        alert('Thread added successfully');
        window.location.reload()
        this.threadForm.reset();
      },
      err => {
        console.log(err);
      });
  }

  getFormControl(name) {
    return this.threadForm.get(name);
}

}
