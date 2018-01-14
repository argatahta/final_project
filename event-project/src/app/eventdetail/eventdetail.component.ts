import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-eventdetail',
  templateUrl: './eventdetail.component.html',
  styleUrls: ['./eventdetail.component.css']
})
export class EventdetailComponent implements OnInit {

  obj: {};

  constructor(private http: Http, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadEventDetail(params['id'])
    })
  }

  loadEventDetail(id) {

    this.http.get("http://localhost:3000/api/event/" + id)
      .subscribe(
      result => {
        this.obj = result.json();
        console.log(this.obj)
      },
      error => {
        console.log("error")
      }
      )
  }

}
