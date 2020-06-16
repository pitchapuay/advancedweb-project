import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { SigninComponent } from './components/user/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularWebStorageModule } from 'angular-web-storage'
import { HttpClientModule } from '@angular/common/http';
import { ThreadComponent } from './components/thread/thread.component';

import {TypeComponent } from './components/type/type.component'
import { TopThreadComponent } from './components/top-thread/top-thread.component';
import { PanlumComponent } from './components/panlum/panlum.component';
import { ReadComponent } from './components/read/read.component';
import { CommentComponent } from './components/comment/comment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TopComponent } from './components/top/top.component';
import { MypostComponent } from './components/mypost/mypost.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    ThreadComponent,
    TypeComponent,
    TopThreadComponent,
    PanlumComponent,
    ReadComponent,
    CommentComponent,
    ProfileComponent,
    TopComponent,
    MypostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularWebStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
