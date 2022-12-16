import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.interface';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {

  constructor(private ar: ActivatedRoute, private pstSrv: PostsService, private router: Router) { }

  p: Post | undefined
userData: any = []

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
      if (this.userData.name !== this.p?.author) {
        this.router.navigate(['/posts/', x]);
      }
    })
  }

    update(form: NgForm) {
    console.log(this.p)
      let post: Post = {
        id: this.p!.id,
        title: this.p!.title,
        body: this.p!.body,
        date: this.p!.date,
        author: this.p!.author,
        authorImage: this.p!.authorImage,
        category: this.p!.category,
        subtitle: this.p!.subtitle,
        image: this.p!.image,
        cover: this.p!.cover
      }
      console.log(post)
      this.pstSrv.updatePost(post).subscribe((data) => {
        this.router.navigate(['/posts/', post.id]);

      })
    }
  }

