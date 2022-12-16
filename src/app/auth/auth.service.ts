import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface AuthData {
    user: {
        id: number,
        name: string,
        email: string,
        password: string
    };
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    url = 'https://6396f0fd77359127a027315e.mockapi.io';
    private authSubj = new BehaviorSubject<null | AuthData>(null);

    user$ = this.authSubj.asObservable();
    isLoggedIn$ = this.user$.pipe(map(user => !!user))

    timeoutLogout: any

    constructor(private http: HttpClient, private router: Router) {
        this.restore()
    }

    login(user: { user: any, email: string, password: string }) {
        this.authSubj.next(user)
        return this.http.get(`${this.url}/users`)
    }

    restore() {
        const user = localStorage.getItem('user');
        if (!user) {
            return;
        }
        const userdata: AuthData = JSON.parse(user);
        this.authSubj.next(userdata)
    }

    registration(data: { name: string; email: string; password: string }) {
        return this.http.post(`${this.url}/users`, data);
    }

    logout() {
        this.authSubj.next(null);
        localStorage.removeItem('user')
        this.router.navigate(['/login'])
        if (this.timeoutLogout) {
            clearTimeout(this.timeoutLogout)
        }
    }

}
