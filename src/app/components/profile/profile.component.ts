import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {



  constructor(private service: UsersService) { }

  ngOnInit(): void {
    this.getUser();
  }

  showInput = false;
  showIcon = false;

  u: User | undefined;
  userData: any = [];

  getUser() {
    let userLogged: any = localStorage.getItem('user');
    this.userData = JSON.parse(userLogged);

  }


    updateImg(form: NgForm) {
      let user: User = {
        id: this.userData.id,
        name: this.userData.name,
        email: this.userData.email,
        password: this.userData.password,
        image: form.value.image,

      }
      console.log(user.id)
      this.service.updateUser(user).subscribe((data: any) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.getUser();
      })
    }

}
