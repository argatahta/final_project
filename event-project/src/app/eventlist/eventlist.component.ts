import { Component, OnInit} from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";

import { EventService } from "../event.service";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit  {



  eventList: any[];
  eventTopicFilter = null
  eventTypeFilter = null
  n: number = 1


  typeList = ["All","Appearance or Signing", "Attraction", "Camp, Trip, or Retreat", "Class, Training or Workshop", "Concert or Performance", "Conference", "Convention", "Dinner or Gala", "Festival or Fair", "Game or Competition", "Meeting or Networking Event", "Other", "Party or Social Gathering", "Race or Endurance Event", "Rally", "Screening", "Seminar or Talk", "Tour", "Tournament", "Tradeshow, Consumer Show, or Expo"].sort();

  topicList = ["All","Auto, Boat & Air", "Business & Professional", "Charity & Causes", "Community & Culture", "Family & Education", "Fashion & Beauty", "Film, Media & Entertainment", "Food & Drink", "Government & Politics", "Health & Wellness", "Hobbies & Special Interest", "Home & Lifestyle", "Music", "Other", "Performing & Visual Arts", "Religion & Spirituality", "School Activities", "Science & Technology", "Seasonal & Holiday", "Sports & Fitness", "Travel & Outdoor"].sort();


  constructor(private http: Http, private route: Router, private eventService: EventService) { }

  ngOnInit() {
    this.loadEventList()
    
  }

  // onChange Function = fungsi untuk merubah eventType data binding
  onChangeType(newValue){
    console.log(newValue)
    this.eventTypeFilter = newValue

    if(this.eventTypeFilter!=null){
      this.http.get("http://localhost:3000/api/event?limit=4&eventtype="+this.eventTypeFilter)
      .subscribe(
      result => {
        this.eventList = result.json();
        console.log(this.eventList);
      },
      error => {
        console.log("Get Eventlist error");
      }
      )
    }
    if(this.eventTopicFilter!=null && this.eventTypeFilter!=null){
      this.onChangeAll(this.eventTypeFilter, this.eventTopicFilter)
    }
  }

  onChangeTopic(newValue){
    console.log(newValue)
    this.eventTopicFilter = newValue.replace("&", "%26")

    if(this.eventTopicFilter!=null){
      this.http.get("http://localhost:3000/api/event?limit=4&eventtopic="+this.eventTopicFilter)
      .subscribe(
      result => {
        this.eventList = result.json();
        console.log(this.eventList);
      },
      error => {
        console.log("Get Eventlist error");
      }
      )
    }
    if(this.eventTopicFilter!=null && this.eventTypeFilter!=null){
      this.onChangeAll(this.eventTypeFilter, this.eventTopicFilter)
    }
  }

  onChangeAll(type, topic){

    this.http.get("http://localhost:3000/api/event?limit=4&eventtopic="+topic+"&eventtype="+type)
      .subscribe(
      result => {
        this.eventList = result.json();
        console.log(this.eventList);
      },
      error => {
        console.log("Get Eventlist error");
      }
      )
  }


  nextButton() {

    this.n++

    this.http.get("http://localhost:3000/api/event?limit=4&page=" + this.n)
      .subscribe(
      result => {

        if (result.json().length > 0) {
          this.eventList = result.json();
          console.log(this.eventList);
        } else{
          this.n--
        }
      },
      error => {
        console.log("Get Eventlist error");
      }
      )
  }


  prevButton() {

    //misal n lebih besar prevButton() baru bisa di eksekusi
    if(this.n>1){
      this.n--

      this.http.get("http://localhost:3000/api/event?limit=4&page=" + this.n)
      .subscribe(
      result => {
        this.eventList = result.json();
        console.log(this.eventList);
      },
      error => {
        console.log("Get Eventlist error");
      }
      )    
    }
  }

  loadEventList() {

    this.http.get("http://localhost:3000/api/event?limit=4")
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
