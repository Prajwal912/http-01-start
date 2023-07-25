import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.mode';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPost:Post[] = []
  isLoading:boolean = false

  constructor(private http: HttpClient, private commonPost:HttpService) { }

  onCreatePost(postData: { title: string, content: string }) {
    this.commonPost.createAndStorePost(postData.title, postData.content)
  }

  onFetchPosts() {
    this.commonPost.fetchPosts()
  }

  ngOnInit() {
    this.commonPost.fetchPosts()
  }




}
