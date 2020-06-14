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
import { PostThreadComponent } from './components/post-thread/post-thread.component'

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    ThreadComponent,
    PostThreadComponent
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
