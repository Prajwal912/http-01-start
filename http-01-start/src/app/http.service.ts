import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.mode';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  errorSubject = new Subject<string>()

  constructor(private http: HttpClient) { }


  createAndStorePost(title:string, content:string){
    let postData = {tit:title, cont:content};
    this.http.post<{name:string}>('https://http-client-backend-default-rtdb.firebaseio.com/posts.json',
    postData
  ).subscribe(res => {
    console.log(res)
  },
  error => {
    this.errorSubject.next(error.message)
  })
  }

  fetchPosts(){
   return  this.http
    .get<{[item:string]: Post}>("https://http-client-backend-default-rtdb.firebaseio.com/posts.json")
    .pipe(
      map((res) => {
        let postData:Post[] = [];
        for (let item in res){
          if(res.hasOwnProperty(item)){
            postData.push({...res[item], id:item})
          }
        }
           return postData
      } , (error: { statusText: string; }) => {
        this.errorSubject.next(error.statusText)
      }))
    }


    deletePost(){
    return  this.http.delete("https://http-client-backend-default-rtdb.firebaseio.com/posts.json")
    }
}
