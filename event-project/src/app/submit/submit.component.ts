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

    if(f.value.title !=null&&f.value.title != ""&&f.value.place !=null&&f.value.place != ""&&f.value.date !=null&&f.value.date != ""&&f.value.time !=null&&f.value.time != ""&&f.value.description !=null&&f.value.description != ""&&f.value.price !=null&&f.value.price != ""&&f.value.contact !=null&&f.value.contact != ""&&this.file !=null){

      let formData = new FormData();
      formData.append("title", f.value.title);
      formData.append("place", f.value.place);
      formData.append("date", f.value.date);
      formData.append("time", f.value.time);
      formData.append("description", f.value.description);
      formData.append("price", f.value.price);
      formData.append("contact", f.value.contact);
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
