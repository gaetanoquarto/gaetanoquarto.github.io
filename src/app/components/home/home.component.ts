import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sub!: Subscription;
  lastPost: Post[] | undefined;
  notLastPosts: Post[] | undefined

  constructor(private pstSrv: PostsService) { }

  ngOnInit(): void {
      this.getLastPosts();
  }

  getLastPosts() {
      this.sub = this.pstSrv.getPosts().subscribe((post) => {
          this.lastPost = post.slice(-1).reverse();
          this.notLastPosts = post.slice(-5, -1).reverse();
      })
  }

}
