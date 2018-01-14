import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {

  eventList: any[];

  constructor(private http: Http, private route: Router) { }

  ngOnInit() {

    this.loadEventList()
  }

  loadEventList() {

    this.http.get("http://localhost:3000/api/event")
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

  loadCatNav() {
    $('#cat_nav').mobileMenu()
  }

  loadCheckBox() {
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-grey',
      radioClass: 'iradio_square-grey'
    });
  }
}
