import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    name: new FormControl('',[Validators.required]),
    age: new FormControl('',[Validators.required]),
    file: new FormControl('',[Validators.required]),
    avatar: new FormControl('',[Validators.required])
  });

  previewLoaded: boolean = false;

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
          this.profileForm.reset()
      },
      err => {
        console.log(err)
        alert('Username or Password is incorrect')
      })
  }

  onChangeImg(e: any) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0]
      var pattern = /image-*/
      const reader = new FileReader()
      if (!file.type.match(pattern)) {
        alert('invalid format')
        this.profileForm.reset()
      } else {
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.previewLoaded = true
          this.profileForm.patchValue({
            avatar: reader.result
          });
        };
      }
    }
  }

  resetForm() {
    this.profileForm.reset();
    this.previewLoaded = false
  }

}
