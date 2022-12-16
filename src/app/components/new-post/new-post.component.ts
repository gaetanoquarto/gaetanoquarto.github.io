import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.interface';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  constructor(private ar: ActivatedRoute, private pstSrv: PostsService, private router: Router) { }

userData: any = []

  ngOnInit(): void {

  }

  currentDate: Date = new Date();
 fullDate = `${this.currentDate.getDate()}-${(this.currentDate.getMonth() + 1)}-${this.currentDate.getFullYear()}`



  newPost:Partial <Post> = {
    title: '',
    author: '',
    authorImage: '',
    body: '',
    category: '',
    date: this.fullDate,
    subtitle: '',
    image: '',
    cover: '',
  }

    create(form: NgForm) {
      let userLogged: any = localStorage.getItem('user');
    this.userData = JSON.parse(userLogged);
    console.log(this.userData)

      this.newPost.title = form.value.title
      this.newPost.author = this.userData.name
      this.newPost.authorImage = this.userData.image
      this.newPost.body = form.value.body
      this.newPost.category = form.value.category
      this.newPost.subtitle = form.value.subtitle
      this.newPost.image = form.value.image
      this.newPost.cover = form.value.cover
      this.pstSrv.createPost(this.newPost).subscribe((res: any) => {
        this.router.navigate(['/']);
      })
    }
}
