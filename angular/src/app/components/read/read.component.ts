import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThreadService } from 'src/app/serveices/thread.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage'
import { CommentService } from 'src/app/serveices/comment.service';
import { LikeService } from 'src/app/serveices/like.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  threads: any
  ids: string;
  title: any
  text: any
  name: any
  avatar: any
  likes: any
  count: any
  status = false;
  statusLike = false;

  commentForms = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    idThread: new FormControl(this.local.get('idThread')),
    idUser: new FormControl(this.local.get('id')),
    profile: new FormGroup({
      name: new FormControl(this.local.get('name')),
      age: new FormControl(this.local.get('age')),
      avatar: new FormControl(this.local.get('avatar')),
    }),
  });

  likeForms = new FormGroup({
    idThread: new FormControl(this.local.get('idThread')),
    idUser: new FormControl(this.local.get('id')),
  });

  countForms = new FormGroup({
    like: new FormControl(this.local.get('count') + 1,),
  });

  countDelteForms = new FormGroup({
    like: new FormControl(this.local.get('count') - 1,),
  });

  getFormControl(name) {
    return this.commentForms.get(name);
  }


  constructor(private route: ActivatedRoute,
    private th: ThreadService,
    private local: LocalStorageService,
    private cm: CommentService,
    private lk: LikeService) { }

  ngOnInit(): void {

    if (this.local.get('id') != null) {
      this.status = true;
    }

    let id = this.route.snapshot.paramMap.get('id')
    this.ids = id;

    this.onLoading();
    this.onLikeCheck();

  }
  onLoading() {
    try {
      this.th.getReadThread(this.ids).subscribe(
        data => {
          this.local.set('count', data[0]['like'])
          this.threads = data
          this.title = data[0]['title']
          this.text = data[0]['textArea']
          this.avatar = data[0]['profile']['avatar']
          this.name = data[0]['profile']['name']
        },
        err => {
          console.log(err)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }


  onLikeCheck() {
    try {
      this.lk.getReadLike(this.ids, this.local.get('id')).subscribe(
        data => {
          this.likes = data
          if (data[0] == null) {
            this.statusLike = true;
          } else {
            this.statusLike = false;
          }
        },
        err => {
          console.log(err)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  onLikeCheckDelte() {
    try {
      this.lk.getReadLike(this.ids, this.local.get('id')).subscribe(
        data => {
          this.likes = data
          this.count = data[0]['_id']
          this.local.set('idLike', this.count)
          if (data[0] == null) {
            this.statusLike = true;
          } else {
            this.statusLike = false;
          }
        },
        err => {
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


  addLike() {
    this.lk.addLike(this.likeForms.value).subscribe(
      data => {
        console.log(data)
        //  alert('like added successfully');
        //window.location.reload()
        this.commentForms.reset();
      },
      err => {
        console.log(err);
      });
  }
  updateCount() {
    this.th.updateCount(this.ids, this.countForms.value).subscribe(
      data => {
        console.log(data)
        this.onLikeCheck();
      },
      err => {
        console.log(err);
      });
  }

  updateCountDelte() {
    this.th.updateCount(this.ids, this.countDelteForms.value).subscribe(
      data => {
        console.log(data)
        // this.onLikeCheck();
      },
      err => {
        console.log(err);
      });
  }


  deleteLike(event) {
    this.lk.deleteLike(event).subscribe(
      data => {
        console.log(data)
        //  alert('delete added successfully');
        this.onLoading();
      },
      err => {
        console.log(err);
      });
  }

  like() {
    //alert( this.threads[0]['like']);
    this.onLoading();
    this.onLikeCheck();
    this.addLike();
    this.updateCount();
  }
  unlike() {
    this.onLoading();
    this.onLikeCheckDelte();
    this.deleteLike(this.local.get('idLike'))
    this.updateCountDelte();
    this.statusLike = true;
    this.onLoading();
  }
}
