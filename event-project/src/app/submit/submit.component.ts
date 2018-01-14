import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {

  file: File;
  imagePath: string;
  eventList: any[];
  

  typeList = ["Appearance or Signing", "Attraction", "Camp, Trip, or Retreat", "Class, Training or Workshop", "Concert or Performance", "Conference", "Convention", "Dinner or Gala", "Festival or Fair", "Game or Competition", "Meeting or Networking Event", "Other", "Party or Social Gathering", "Race or Endurance Event", "Rally", "Screening", "Seminar or Talk", "Tour", "Tournament", "Tradeshow, Consumer Show, or Expo"].sort();

  topicList = ["Auto, Boat & Air", "Business & Professional", "Charity & Causes", "Community & Culture", "Family & Education", "Fashion & Beauty", "Film, Media & Entertainment", "Food & Drink","Government & Politics", "Health & Wellness", "Hobbies & Special Interest", "Home & Lifestyle", "Music", "Other", "Performing & Visual Arts","Religion & Spirituality", "School Activities", "Science & Technology", "Seasonal & Holiday", "Sports & Fitness", "Travel & Outdoor"].sort();

  constructor(private http: Http, private route: Router) { }


  ngOnInit() {
    const token = sessionStorage.getItem("token");
    if(!token){
      this.route.navigate(['/login']);
    }else{
      let header = new Headers({"Authorization":"Bearer "+token});
      let options = new RequestOptions({headers:header});
      this.http.post("http://localhost:3000/api/validatetoken",{},options)
      .subscribe(
        result =>{

        },
        error=>{
          sessionStorage.removeItem("token");
          this.route.navigate(['/login'])
        }
      )
    }

  }

  fileChange($event) {
    this.file = $event.target.files[0];
    console.log(this.file);
  }

  submit(f: NgForm) {

    if(f.value.title !=null&&f.value.title != ""&&f.value.location !=null&&f.value.location != ""&&f.value.dateStart !=null&&f.value.dateStart != ""&&f.value.timeStart !=null&&f.value.timeStart != ""&&f.value.description !=null&&f.value.description != ""&&f.value.price !=null&&f.value.price != ""&&f.value.contact !=null&&f.value.contact != ""&&this.file !=null){

      let formData = new FormData();
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
      formData.append("eventPict", this.file);

      let token = sessionStorage.getItem("token");
      let header = new Headers({"Authorization":"Bearer "+token});
      let options = new RequestOptions({headers: header});
  
      this.http.post("http://localhost:3000/api/event", formData, options)
      .subscribe(
        result=>{
          console.log(result.json());
          this.route.navigate(["/eventlist"]);
        },
        error =>{
          console.log(error);
        }
      )
    }else{
      console.log("Please input all fields.")
    }
    
  }




}
