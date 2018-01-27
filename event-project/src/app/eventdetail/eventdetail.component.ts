import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { ActivatedRoute} from "@angular/router";

import { EventService } from "../event.service";

@Component({
  selector: 'app-eventdetail',
  templateUrl: './eventdetail.component.html',
  styleUrls: ['./eventdetail.component.css']
})
export class EventdetailComponent implements OnInit {

  obj = <any>{};

  constructor(private http: Http, private route: ActivatedRoute, private eventService:EventService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadEventDetail(params['id'])
    })
  }

  loadEventDetail(id) {

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
  }

}
