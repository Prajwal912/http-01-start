import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorsService implements HttpInterceptor {

//req is used for taking the req you wasnt to use then next is used to forwarding the req to the server or getting back res
  intercept(req: HttpRequest<any>, next: HttpHandler){
    console.log('request is on its way before req is gone through the appication it goes from the intercept globally');
    return next.handle(req)
  }
  constructor() { }
}
