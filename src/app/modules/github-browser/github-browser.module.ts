import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './pages/user/user.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserReposComponent } from './components/user-repos/user-repos.component';
import { UsersBrowserComponent } from './components/users-browser/users-browser.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [UserComponent, UserProfileComponent, UserReposComponent, UsersBrowserComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    UserComponent, UserProfileComponent, UserReposComponent, UsersBrowserComponent
  ]
})
export class GithubBrowserModule { }
