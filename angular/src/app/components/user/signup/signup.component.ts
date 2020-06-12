import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  profileForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    title: new FormControl('',[Validators.required]),
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    // stdid: new FormControl('',[Validators.required, Validators.pattern('B[0-9]{7}')]),
    sex: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    birthday: new FormGroup({
      date: new FormControl('',[Validators.required]),
      month: new FormControl('',[Validators.required]),
      year: new FormControl('',[Validators.required])
    }),
    address: new FormGroup({
      street: new FormControl('',[Validators.required]),
      city: new FormControl('',[Validators.required]),
      state: new FormControl('',[Validators.required]),
      zip: new FormControl('',[Validators.required])
    }),
    aliases: new FormArray([
      new FormControl('')
    ])
  });

  get email() { return this.profileForm.get('email'); }

  // get stdid() { return this.profileForm.get('stdid'); }

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  constructor() { }

  ngOnInit(): void {
  }

  addAlias() {
    this.aliases.push(new FormControl(''));
  }

  checkForm(){
    return this.email.invalid ? "INVALID" : "VALID" ;
  }

}
