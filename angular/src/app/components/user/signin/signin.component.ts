import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  })

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {

  }

  signin() {
    // console.log(this.authForm.value)
    this.auth.signIn(this.authForm.value).subscribe(
      data => {
        if (data.status == true) {
          
          alert('sign in success')
          this.router.navigate(['/panlum'])
        } else {
          alert('Username or Password is incorrect')
        }
      },
      err => {
        console.log(err)
        alert('Username or Password is incorrect')
      })
  }
  

}
