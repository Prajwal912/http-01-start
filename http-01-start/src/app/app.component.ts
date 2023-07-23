import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPost = []

  constructor(private http: HttpClient) { }

  onCreatePost(postData: { title: string, content: string }) {
    this.http.post('https://http-client-backend-default-rtdb.firebaseio.com/posts.json',
      postData
    ).subscribe(res => {
      console.log(res)
    })
  }

  onFetchPosts() {
    this.fetchPosts()
  }

  ngOnInit() {
    this.fetchPosts()
  }


  private fetchPosts() {
    this.http
      .get<any>("https://http-client-backend-default-rtdb.firebaseio.com/posts.json")
      .pipe(
        map(res => {
          let postData = [];
          for (let item in res){
            if(res.hasOwnProperty(item)){
              postData.push({...res[item], id:item})
            }
          }
             return postData
        }))
      .subscribe(res => {
        console.log(res);
      });
  }

}
