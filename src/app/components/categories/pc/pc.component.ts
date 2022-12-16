import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-pc',
  templateUrl: './pc.component.html',
  styleUrls: ['./pc.component.scss']
})
export class PcComponent implements OnInit {

  constructor(private pstSrv: PostsService) { }

  page = 1;
  sub: Subscription | undefined
  posts: Post[] | undefined
  logged = false;


  ngOnInit(): void {
    this.sub = this.pstSrv.getCategoryPosts('pc').subscribe((post) => {
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
