import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/services/posts.service';

@Component({
    selector: 'app-nintendo',
    templateUrl: './nintendo.component.html',
    styleUrls: ['./nintendo.component.scss']
})
export class NintendoComponent implements OnInit {

    constructor(private pstSrv: PostsService) { }

    logged = false;
    page = 1;
    sub: Subscription | undefined
    posts: Post[] | undefined

    ngOnInit(): void {
        this.sub = this.pstSrv.getCategoryPosts('nintendo').subscribe((post) => {
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
