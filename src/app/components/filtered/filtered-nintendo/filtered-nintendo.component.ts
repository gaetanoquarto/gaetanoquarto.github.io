import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post.interface';
@Component({
  selector: 'app-filtered-nintendo',
  templateUrl: './filtered-nintendo.component.html',
  styleUrls: ['./filtered-nintendo.component.scss']
})
export class FilteredNintendoComponent implements OnInit {

  sub!: Subscription;
  posts: Post[] | undefined;

  constructor(private pstSrv: PostsService) { }

  ngOnInit(): void {
      this.getLastThreeNintendo();
  }

  getLastThreeNintendo() {
      this.sub = this.pstSrv.getCategoryPosts('nintendo').subscribe((post) => {
          this.posts = post.slice(-3).reverse();
      })
  }

}
