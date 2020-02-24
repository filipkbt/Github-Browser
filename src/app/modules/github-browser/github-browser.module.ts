import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './pages/user/user.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserReposComponent } from './components/user-repos/user-repos.component';



@NgModule({
  declarations: [UserComponent, UserProfileComponent, UserReposComponent],
  imports: [
    CommonModule
  ],
  exports: [
    UserComponent, UserProfileComponent, UserReposComponent
  ]
})
export class GithubBrowserModule { }
