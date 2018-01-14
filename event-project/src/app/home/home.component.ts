import { Component, OnInit } from '@angular/core';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }
  
  loadOwlCarousel() {
    $('.owl-carousel').owlCarousel({
      loop: true,
      margin: 10,
      responsiveClass:true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 5
        }
      }
    })
  }


}
