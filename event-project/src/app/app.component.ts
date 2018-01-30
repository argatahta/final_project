import { Component,AfterViewChecked, OnInit} from '@angular/core';

declare var $:any
declare var jQuery:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  loginUsername = "Sign in"
  logout = "Logout"
  visible = false
  
ngOnInit(){
 this.loadDropdownMenu();

}

loadDropdownMenu(){
  $('a.open_close').on("click",function() {
    $('.main-menu').toggleClass('show');
    $('.layer').toggleClass('layer-is-visible');
  });
  $('a.show-submenu').on("click",function() {
    $(this).next().toggleClass("show_normal");
  });
  $('a.show-submenu-mega').on("click",function() {
    $(this).next().toggleClass("show_mega");
  });
  if($(window).width() <= 480){
    $('a.open_close').on("click",function() {
    $('.cmn-toggle-switch').removeClass('active')
  });
  }
}

  ngAfterViewChecked(){
   

    if(!sessionStorage.getItem("username") && !localStorage.getItem("username")){
      this.loginUsername = "Sign in"
      this.visible = false
    }

    if(sessionStorage.getItem("username")){
      this.visible = true
      this.loginUsername =sessionStorage.getItem("username")
    }
    if(localStorage.getItem("username")){
      this.visible = true;
      this.loginUsername = localStorage.getItem("username");
    }
  }

  logoutButton(){
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("userid")

    localStorage.removeItem("username")
    localStorage.removeItem("token")
    localStorage.removeItem("userid")

    console.log(this.loginUsername)
    this.loginUsername = "Sign in"
    this.visible = false
  }

  
}
