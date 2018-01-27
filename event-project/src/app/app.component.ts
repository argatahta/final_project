import { Component,AfterViewChecked} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loginUsername = "Sign in"
  logout = "Logout"
  visible = false
  
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
