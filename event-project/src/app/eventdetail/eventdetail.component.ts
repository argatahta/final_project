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
