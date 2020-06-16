import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/user/signup/signup.component';
import { SigninComponent } from './components/user/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { PanlumComponent } from './components/panlum/panlum.component';
import { ReadComponent } from './components/read/read.component';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'panlum', component: PanlumComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'read/:id', component: ReadComponent },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
