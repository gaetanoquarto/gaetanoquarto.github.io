import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post.interface';


@Component({
  selector: 'app-filtered-playstation',
  templateUrl: './filtered-playstation.component.html',
  styleUrls: ['./filtered-playstation.component.scss']
})
export class FilteredPlaystationComponent implements OnInit {

  sub!: Subscription;
  lastPost: Post[] | undefined;
  notLastPosts: Post[] | undefined

  constructor(private pstSrv: PostsService) { }

  ngOnInit(): void {
      this.getLastThreePS();
  }

  getLastThreePS() {
      this.sub = this.pstSrv.getCategoryPosts('playstation').subscribe((post) => {
          this.lastPost = post.slice(-1).reverse();
          this.notLastPosts = post.slice(-3, -1).reverse();
      })
  }

}
