import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { EventService } from "../event.service";


declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  eventList: any[];
  eventUpdate
  obj = <any>{};

  token: any
  userid: any

  typeList = ["Appearance or Signing", "Attraction", "Camp, Trip, or Retreat", "Class, Training or Workshop", "Concert or Performance", "Conference", "Convention", "Dinner or Gala", "Festival or Fair", "Game or Competition", "Meeting or Networking Event", "Other", "Party or Social Gathering", "Race or Endurance Event", "Rally", "Screening", "Seminar or Talk", "Tour", "Tournament", "Tradeshow, Consumer Show, or Expo"].sort();

  topicList = ["Auto, Boat & Air", "Business & Professional", "Charity & Causes", "Community & Culture", "Family & Education", "Fashion & Beauty", "Film, Media & Entertainment", "Food & Drink", "Government & Politics", "Health & Wellness", "Hobbies & Special Interest", "Home & Lifestyle", "Music", "Other", "Performing & Visual Arts", "Religion & Spirituality", "School Activities", "Science & Technology", "Seasonal & Holiday", "Sports & Fitness", "Travel & Outdoor"].sort();

  constructor(private http: Http, private eventService: EventService, private route: Router) { }

  ngOnInit() {
    this.tokenValidation()
  }

  tokenValidation() {


    if (!sessionStorage.getItem("token")) {
      this.token = localStorage.getItem("token")
      console.log(this.token + " local")

    }
    if (!localStorage.getItem("token")) {
      this.token = sessionStorage.getItem("token")
      console.log(this.token + " session")
    }
    if (!sessionStorage.getItem("token") && !localStorage.getItem("token")) {
      this.route.navigate(['/login']);
    }

    let header = new Headers({ "Authorization": "Bearer " + this.token });
    let options = new RequestOptions({ headers: header });
    this.http.post("http://localhost:3000/api/validatetoken", {}, options)
      .subscribe(
      result => {
        console.log(result.json())
        this.loadEventList()
      },
      error => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userid");
        sessionStorage.removeItem("username")
        this.route.navigate(['/login'])
      }
      )

  }

  loadEventList() {

    if (!sessionStorage.getItem("userid")) {
      this.userid = localStorage.getItem("userid")
    }
    if (!localStorage.getItem("userid")) {
      this.userid = sessionStorage.getItem("userid")
    }
    console.log(this.userid)
    this.http.get("http://localhost:3000/api/event?user=" + this.userid)
      .subscribe(
      result => {
        this.eventList = result.json();
        console.log(this.eventList);
      },
      error => {
        console.log("Get Eventlist error");
      }
      )
  };

  editEvent(f: NgForm) {

    console.log(f.value.id)

    let formData = new FormData();
    formData.append("_id", f.value.id)
    formData.append("title", f.value.title);
    formData.append("location", f.value.location);
    formData.append("dateStart", f.value.dateStart);
    formData.append("timeStart", f.value.timeStart);
    formData.append("dateEnd", f.value.dateEnd);
    formData.append("timeEnd", f.value.timeEnd);
    formData.append("description", f.value.description);
    formData.append("price", f.value.price);
    formData.append("contact", f.value.contact);
    formData.append("eventType", f.value.eventType);
    formData.append("eventTopic", f.value.eventTopic);


    this.eventService.updateEvent(formData)
      .subscribe(
      result => {
        console.log(result);
        $('#myModal').modal("toggle");
        this.loadEventList();


      },
      error => {
        console.log("Edit Eventlist error");
      }
      )
  }

  //untuk buka toggle sekaligus mendapatkan eventid yang akan di update
  toogleModal(id) {


    this.eventService.getDetail(id)
      .subscribe(
      result => {
        this.obj = result.json();
        console.log(this.obj)
      },
      error => {
        console.log("error")
      }
      )

    $('#myModal').modal('show');


  }

  deleteEvent(id) {

    this.eventService.deleteEvent(id)
      .subscribe(
      result => {
        console.log(result);
        this.loadEventList();
      },
      error => {
        console.log("Delete Eventlist error");
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
