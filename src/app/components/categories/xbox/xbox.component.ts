import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-xbox',
  templateUrl: './xbox.component.html',
  styleUrls: ['./xbox.component.scss']
})
export class XboxComponent implements OnInit {

    constructor(private pstSrv: PostsService) { }

    page = 1;
    sub: Subscription | undefined
    posts: Post[] | undefined
    logged = false;


    ngOnInit(): void {
      this.sub = this.pstSrv.getCategoryPosts('xbox').subscribe((post) => {
        this.posts = post;
      })
      const value = localStorage.getItem('user');
      if(value) {
        this.logged = true;
      } else {
        this.logged = false;
      }
    }

  }
