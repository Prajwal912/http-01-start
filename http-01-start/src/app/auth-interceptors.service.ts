import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorsService implements HttpInterceptor {
//requests interceptors
//req is used for taking the req you wasnt to use then next is used to forwarding the req to the server or getting back res
  intercept(req: HttpRequest<any>, next: HttpHandler){
    // console.log('request is on its way before req is gone through the appication it goes from the intercept globally');
    // console.log(req.url)// it accesses the url in http service directly
    const modifiedReq = req.clone({
      headers: req.headers.append('Auth', 'xyz')// it accesses the url and the headers in http service directly
    })
    return next.handle(modifiedReq)
  }
  constructor() { }
}
