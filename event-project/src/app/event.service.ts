import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class EventService {

  constructor(private http:Http) { }

  getList(){
    return this.http.get("http://localhost:3000/api/event")
  }

  getDetail(id){
    return this.http.get("http://localhost:3000/api/event/"+id)
  }

  deleteEvent(id){
    return this.http.delete("http://localhost:3000/api/event/"+id)

  }

  updateEvent(formData){
    return this.http.put("http://localhost:3000/api/event/",formData)

  }

  submitEvent(formData,options){
    return this.http.post("http://localhost:3000/api/event", formData, options)

  }

  

}
