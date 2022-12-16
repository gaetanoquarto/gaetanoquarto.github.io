import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.interface';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://6396f0fd77359127a027315e.mockapi.io/posts');
  }

  deletePost(id: number) {
    return this.http.delete(`https://6396f0fd77359127a027315e.mockapi.io/posts/${id}`)
  }

  updatePost(post: Post) {
    return this.http.put<Post>(`https://6396f0fd77359127a027315e.mockapi.io/posts/${post.id}`, post);
  }

  createPost(post:Partial <Post>) {
    return this.http.post(`https://6396f0fd77359127a027315e.mockapi.io/posts/`, post);
  }

  postComment(id: number, comment: Partial <Comment>) {
    return this.http.post<Comment>(`https://6396f0fd77359127a027315e.mockapi.io/posts/${id}/comments`, comment)
  }

  getComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`https://6396f0fd77359127a027315e.mockapi.io/posts/${id}/comments`);
  }

  updateComments(id: number, commentId: number, comment: Comment) {
    return this.http.put<Post>(`https://6396f0fd77359127a027315e.mockapi.io/posts/${id}/comments/${commentId}`, comment);
  }

  getCategoryPosts(category: string): Observable<Post[]> {
    return this.http.get<Post[]>(`https://6396f0fd77359127a027315e.mockapi.io/posts?category=${category}`);
  }

}
