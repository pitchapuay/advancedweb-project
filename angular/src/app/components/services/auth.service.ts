import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { LocalStorageService } from 'angular-web-storage'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public local: LocalStorageService) { }

  signIn(authData: any) {
    return this.http.post<any>('http://localhost:3000/signin/signin', authData)
      .pipe(map(data => {
        if (data) {
          this.local.set('user', data, 1, 'w')
          this.local.set('id',data['result']['id'])
          console.log(this.local.get('user'))
         
        }
        return data
      }))
  }

  signUp(authData: any) {
    return this.http.post<any>('http://localhost:3000/user/signup', authData)
      .pipe(map(data => {
        if (data) {
          this.local.set('user', data, 1, 'w')
          console.log(this.local.get('user'))
        }
        return data
      }))
  }
}
