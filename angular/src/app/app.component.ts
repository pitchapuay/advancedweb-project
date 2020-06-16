import { Component ,OnInit,DoCheck} from '@angular/core';
import { LocalStorageService } from 'angular-web-storage'
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,DoCheck{
  status = false;
  ngOnInit(): void {
    
  }
  
  constructor(private local:LocalStorageService,private router:Router){}
  ngDoCheck(): void {
    if(this.local.get('id')!=null){
      this.status = true;
    }
  }
  title = 'angular';
  logout(){
    this.local.set('id',null)
    this.status = false;
  }

  toProfile(){
    this.router.navigate(['/profile',this.local.get('id')]);
    
  }
}
