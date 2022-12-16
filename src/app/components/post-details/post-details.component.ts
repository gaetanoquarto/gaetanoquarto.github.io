import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.interface';
import {ActivatedRoute} from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  constructor(private ar: ActivatedRoute, private pstSrv: PostsService, private router: Router ) { }

  p: Post | undefined
  sub: Subscription | undefined
  posts: Post[] | undefined
  userData: any = []

  owner = false;

  ngOnInit(): void {
    let x = this.ar.snapshot.params["id"];
    this.pstSrv.getPosts().subscribe((posts: Post[]) => {
      this.p = posts.find((element) => {
        if(x == element.id) {
          return true;
        } else {
          return false;
        }
      })
      let userLogged: any = localStorage.getItem('user');
    this.userData = JSON.parse(userLogged);
    if (this.userData.name === this.p?.author) {
      this.owner = true;
    }
    })

  }

  deletePost(id: number) {
    this.sub = this.pstSrv.deletePost(id).subscribe(() => {
      this.posts = this.posts?.filter(post => post.id !== id);
      this.router.navigate(['/']);
    })
  }


}
