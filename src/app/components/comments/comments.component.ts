import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Comment } from 'src/app/models/comment.interface';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.interface';
import { User } from 'src/app/models/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  constructor(private ar: ActivatedRoute, private pstSrv: PostsService, private router: Router, private usrSrv: UsersService) { }

  ngOnInit(): void {
    this.updateData();
  }

  sub: Subscription | undefined
  p: Post | undefined
  comments: Comment[] | undefined
  users: User[] | undefined


  currentDate: Date = new Date();
  fullDate = `${this.currentDate.getDate()}-${(this.currentDate.getMonth() + 1)}-${this.currentDate.getFullYear()}`

  newComment: Partial<Comment> = {
    postId: 0,
    userId: 0,
    name: '',
    comment: '',
    date: this.fullDate,
    image: ''
  }


  post(form: NgForm) {
    //otteniamo i dati dello user loggato
    const storedData = localStorage.getItem('user');
    let parseData: any = {};
    parseData = JSON.parse(storedData!);
    //inseriamo i dati in variabili
    let userId = parseData.id
    let name = parseData.name
    let image = parseData.image
    //otteniamo l'id del post
    this.newComment.postId = this.ar.snapshot.params["id"];
    //popoliamo l'oggetto newComment
    this.newComment.userId = userId;
    this.newComment.name = name;
    this.newComment.comment = form.value.comment;
    this.newComment.image = image
    //postiamo sul json
    this.sub = this.pstSrv.postComment(this.newComment.postId!, this.newComment).subscribe((ris) => {
      console.log(ris);
      this.comments?.push(ris)
    })
  }

  updateData() {
    this.sub = this.usrSrv.getusers().subscribe((ris) => {
      this.users = ris;
      console.log(this.users)
      let x = this.ar.snapshot.params["id"];
      this.sub = this.pstSrv.getComments(x).subscribe((data) => {
        console.log(data)
        this.comments = data
        this.users?.some((user) => {
          this.comments?.some((comment) => { if (user.id === comment.userId && user.image !== comment.image) {
            let newUserComment: Comment = {
              id: comment.id,
              postId: comment.postId,
              userId: comment.userId,
              name: comment.name,
              comment: comment.comment,
              date: comment.date,
              image: user.image
            }
            console.log(newUserComment)
            this.pstSrv.updateComments(newUserComment.postId, newUserComment.id, newUserComment).subscribe((ris) => {
              console.log(ris);
              location.reload();
            })
          }
          });
        });



    })
    })

}
}
