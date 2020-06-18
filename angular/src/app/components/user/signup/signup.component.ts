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
    username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9]).{5,40}')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    age: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(100)]),
    file: new FormControl('', [Validators.required]),
    avatar: new FormControl('', [Validators.required])
  });

  previewLoaded: boolean = false;

  get email() { return this.profileForm.get('email'); }

  getFormControl(name) {
    return this.profileForm.get(name);
}

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  signup() {
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
