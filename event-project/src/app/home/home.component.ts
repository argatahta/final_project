import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";

import { EventService } from "../event.service";


declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  eventList: any[];

  eventTotal = this.eventService.getList()
  .subscribe(
    result=>{
      this.eventTotal = result.json().length
      console.log(this.eventList);
    },
    error=>{
      console.log("Get Eventlist error");
    }
  )
  

  constructor(private http: Http, private eventService:EventService) { }

  ngOnInit() {
    this.loadEventList();
  }

  loadEventList(){

    this.http.get("http://localhost:3000/api/event?limit=6")
    .subscribe(
      result=>{
        this.eventList = result.json();
        console.log(this.eventList);
      },
      error=>{
        console.log("Get Eventlist error");
      }
    )
  }
  
  convertDate(d) {
    var newDate = new Date(d);
    return newDate.getDate();
  }

  convertMonth(m) {
    var newMonth = new Date(m).getMonth();

    var month = new Array();
    month[0] = "JAN";
    month[1] = "FEB";
    month[2] = "MAR";
    month[3] = "APR";
    month[4] = "MAY";
    month[5] = "JUN";
    month[6] = "JUL";
    month[7] = "AUG";
    month[8] = "SEP";
    month[9] = "OCT";
    month[10] = "NOV";
    month[11] = "DEC";
    return month[newMonth]
  }


}
