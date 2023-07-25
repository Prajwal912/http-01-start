import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.mode';
import { HttpService } from './http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPost: Post[] = []
  isLoading: boolean = false
  error = null;

  private errorSub: Subscription

  constructor(private http: HttpClient, private commonPost: HttpService) { }


  onCreatePost(postData: { title: string, content: string }) {
    this.commonPost.createAndStorePost(postData.title, postData.content)
  }

  onFetchPosts() {
    !this.isLoading
    this.commonPost.fetchPosts().subscribe((res) => {
      this.isLoading
      this.loadedPost = res
    }, error => {
      this.isLoading = false;
      this.error = error.message
    })
  }

  onClearPosts() {
    this.commonPost.deletePost().subscribe(() => {
      this.loadedPost = []
    })
  }

  ngOnInit() {
  this.errorSub = this.commonPost.errorSubject.subscribe((errorMsg) => {
      this.error = errorMsg
    })

    !this.isLoading
    this.commonPost.fetchPosts().subscribe((res) => {
      this.isLoading
      this.loadedPost = res
    }, error => {
      this.error = error.statusText
    })
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe()
  }


  handleError(){
    this.error = null
  }



}
