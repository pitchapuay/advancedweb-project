import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  profileForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    // confirmpassword: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    fullname: new FormControl('',[Validators.required]),
    age: new FormControl('',[Validators.required]),
    avatar: new FormControl('',[Validators.required])
  });

  get email() { return this.profileForm.get('email'); }

  // get stdid() { return this.profileForm.get('stdid'); }

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  checkForm(){
    return this.email.invalid ? "INVALID" : "VALID" ;
  }
  signup(){
    console.log(this.profileForm.value)
    this.auth.signUp(this.profileForm.value).subscribe(
      data => {
          alert('Create your account successfully')
      },
      err => {
        console.log(err)
        alert('Username or Password is incorrect')
      })
  }

}
