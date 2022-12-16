import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { HttpClientModule } from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import { NewPostComponent } from './components/new-post/new-post.component';
import { PlaystationComponent } from './components/categories/playstation/playstation.component';
import { PcComponent } from './components/categories/pc/pc.component';
import { XboxComponent } from './components/categories/xbox/xbox.component';
import { NintendoComponent } from './components/categories/nintendo/nintendo.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: 'posts/:id',
    component: PostDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'posts/:id/edit',
    component: PostEditComponent
  },
  {
    path: 'new-post',
    component: NewPostComponent
  },
  {
    path: 'category/pc',
    component: PcComponent
  },
  {
    path: 'category/xbox',
    component: XboxComponent
  },
  {
    path: 'category/playstation',
    component: PlaystationComponent
  },
  {
    path: 'category/nintendo',
    component: NintendoComponent
  },

]

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
