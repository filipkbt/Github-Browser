import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { Repo } from 'src/app/core/models/repo.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User;
  userRepos: Repo[];
  isLoadingRepos = false;
  isLoadingUserDetails = false;
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(x => {
      this.getUserDetails(x.term);
      this.getUserRepos(x.term);
    })
  }

  getUserDetails(username: string) {
    this.isLoadingUserDetails = true
    this.userService.getUser(username)
      .pipe(finalize(() => this.isLoadingUserDetails = false))
      .subscribe(x => {
        this.user = x;
      }, err => {
        this.snackBar.open('Failed to get user details', 'Close', {
          duration: 3000
        });
      })
  }

  getUserRepos(username: string) {
    this.isLoadingRepos = true;
    this.userService.getUserRepos(username)
      .pipe(finalize(() => this.isLoadingRepos = false))
      .subscribe(x => {
        this.userRepos = x;
      }, err => {
        this.snackBar.open('Failed to get user repos', 'Close', {
          duration: 3000
        });
      });
  }
}
