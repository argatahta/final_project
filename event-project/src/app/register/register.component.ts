import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: Http, private route: Router) { }

  ngOnInit() {
  }

  register(f: NgForm) {
    
    if(f.value.username != null && f.value.username != "" && f.value.password != null && f.value.password != "" && f.value.email != null && f.value.email != "") {

      let obj = {
        username: f.value.username,
        password: f.value.password,
        email: f.value.email,
        firstname: f.value.firstname,
        lastname: f.value.lastname
      }

      let header = new Headers({ "Content-Type": "application/json" });
      let options = new RequestOptions({ headers: header });

      this.http.post("http://localhost:3000/api/user/register", obj, options)
        .subscribe(
        result => {
          this.route.navigate(["/login"]);
        },
        error => {
          console.log("Please Try Again")
        }
        )
    }else{
      console.log("Please input all fields")
    }

  }

}
