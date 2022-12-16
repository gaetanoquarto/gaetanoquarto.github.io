import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post.interface';

@Component({
  selector: 'app-filtered-xbox',
  templateUrl: './filtered-xbox.component.html',
  styleUrls: ['./filtered-xbox.component.scss']
})
export class FilteredXboxComponent implements OnInit {

  sub!: Subscription;
  lastPost: Post[] | undefined;
  notLastPosts: Post[] | undefined

  constructor(private pstSrv: PostsService) { }

  ngOnInit(): void {
      this.getLastThreeXbox();
  }

  getLastThreeXbox() {
      this.sub = this.pstSrv.getCategoryPosts('xbox').subscribe((post) => {
          this.lastPost = post.slice(-1).reverse();
          this.notLastPosts = post.slice(-3, -1).reverse();
      })
  }

}
