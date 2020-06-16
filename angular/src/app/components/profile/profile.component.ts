import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

 
  name: string;
  age: any;
  email:string;
  avatar:string;
  constructor(private local:LocalStorageService) { }

  ngOnInit(): void {

    
    this.name = this.local.get('name')
    this.age = this.local.get('age')
    this.email  =this.local.get('email')
    this.avatar = this.local.get('avatar')
  }
  getName(){
    return this.name;
  }

}
