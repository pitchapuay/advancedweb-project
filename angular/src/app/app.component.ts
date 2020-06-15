import { Component ,OnInit,DoCheck} from '@angular/core';
import { LocalStorageService } from 'angular-web-storage'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,DoCheck{
  status = false;
  ngOnInit(): void {
    
  }
  
  constructor(private local:LocalStorageService){}
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
}
