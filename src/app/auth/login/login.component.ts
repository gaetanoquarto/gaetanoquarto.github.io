import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from 'src/app/models/user.interface';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage: string | undefined;

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    this.authSrv.login(form.value).subscribe((ris) => {
      let users: any = ris;
      users.map((user: User) => {
        const email = form.value.email;
        const password = form.value.password;

        if (user.email === email && user.password === password) {
          let newUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            image: user.image
          }
          localStorage.setItem('user', JSON.stringify(newUser));
          this.router.navigate(['']);
        } else if (user.email !== email && user.password !== password) {
            this.errorMessage = 'I dati sono incorretti o l\'utente non esiste.'
        }
      });
    })
  }

}
