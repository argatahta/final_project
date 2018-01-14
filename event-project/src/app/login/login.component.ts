import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router"
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private http: Http, private route: Router) { }

  ngOnInit() {
  }

  login(f: NgForm) {
    let obj = {
      username: f.value.username,
      password: f.value.password
    };
    let header = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: header });

    this.http.post("http://localhost:3000/api/user/login",obj,options)
    .subscribe(
      result =>{
        console.log(result.json());
        sessionStorage.setItem("token", result.json().token);
        this.route.navigate(["/submit"]);
      },
      error =>{
        console.log("User Not Found");
      }
    )

  }

}
