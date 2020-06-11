import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
// import { AuthService } from '../../services/auth.service'
// import { Router } from '@angular/router'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  // constructor(private router: Router, private auth: AuthService) { }

  constructor() {}

  ngOnInit(): void {

  }

  // signin() {
  //   console.log(this.authForm.value)
  //   this.auth.signIn(this.authForm.value).subscribe(
  //     data => {
  //       if (data.status == true) {
  //         this.router.navigate(['/products'])
  //       } else {
  //         alert('Username or Password is incorrect')
  //       }
  //     },
  //     err => {
  //       console.log(err)
  //       alert('Username or Password is incorrect')
  //     })
  // }

  // signup(){
  //   console.log(this.authForm.value)
  //   this.auth.signUp(this.authForm.value).subscribe(
  //     data => {
  //         alert('Create your account successfully')
  //     },
  //     err => {
  //       console.log(err)
  //       alert('Username or Password is incorrect')
  //     })
  // }
  

}
