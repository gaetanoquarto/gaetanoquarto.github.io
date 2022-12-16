import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getusers(): Observable<User[]> {
    return this.http.get<User[]>('https://6396f0fd77359127a027315e.mockapi.io/users');
  }
  updateUser(user: User) {
    return this.http.put<User>(`https://6396f0fd77359127a027315e.mockapi.io/users/${user.id}`, user);
  }

}
