import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggingIntereceptService implements HttpInterceptor{

  constructor() { }

intercept(req:HttpRequest<any>, next:HttpHandler){
  console.log('outgoing req',req)
  return next.handle(req).pipe(tap(event => {
    if(event.type === HttpEventType.Response){//to get response
     console.log("incoming response")
     console.log(event.body)
    }
  }))
}
}
