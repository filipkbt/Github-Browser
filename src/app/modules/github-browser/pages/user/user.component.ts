import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { Repo } from 'src/app/core/models/repo.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { SnackbarType } from 'src/app/core/enums/snackbar-type.enum';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User;
  userName: string;
  userRepos: Repo[];
  isLoadingRepos = false;
  isLoadingUserDetails = false;
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(x => {
      this.userName = x.userName;
      this.getUserDetails(this.userName);
      this.getUserRepos(this.userName);
    });
  }

  getUserDetails(userName: string) {
    this.isLoadingUserDetails = true;
    this.userService.getUser(userName)
      .pipe(finalize(() => this.isLoadingUserDetails = false))
      .subscribe(x => {
        this.user = x;
      }, err => {
        this.snackbarService.openSnackbar('Failed to get user details.', 'Close', 3000, SnackbarType.Error);
      });
  }

  getUserRepos(userName: string) {
    this.isLoadingRepos = true;
    this.userService.getUserRepos(userName)
      .pipe(finalize(() => this.isLoadingRepos = false))
      .subscribe(x => {
        this.userRepos = x;
      }, err => {
        this.snackbarService.openSnackbar('Failed to get user repos.', 'Close', 3000, SnackbarType.Error);
      });
  }
}
