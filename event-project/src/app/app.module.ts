import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SubmitComponent } from './submit/submit.component';
import { EventlistComponent } from './eventlist/eventlist.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventdetailComponent } from './eventdetail/eventdetail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SubmitComponent,
    EventlistComponent,
    LoginComponent,
    RegisterComponent,
    EventdetailComponent
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,HttpModule,
    RouterModule.forRoot([
      {path:"",component:HomeComponent},
      {path:"submit",component:SubmitComponent},
      {path:"eventlist",component:EventlistComponent},
      {path:"login", component:LoginComponent},
      {path:"register", component:RegisterComponent},
      {path:"detail/:id", component:EventdetailComponent},
      //if path doesnt exist, redirect to home
      {path: '**', redirectTo: ''}

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
