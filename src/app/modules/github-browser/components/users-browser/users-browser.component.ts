import { Component, OnInit } from '@angular/core';
import { IUserResponse, User } from 'src/app/core/models/user.model';
import { SearchService } from 'src/app/core/services/search.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-users-browser',
  templateUrl: './users-browser.component.html',
  styleUrls: ['./users-browser.component.scss']
})
export class UsersBrowserComponent implements OnInit {

  filteredUsers: User[] = [];
  response: IUserResponse;
  githubUsernameFormControl = new FormControl(null, Validators.required);
  isLoading = false;
  constructor(
    private searchService: SearchService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.githubUsernameFormControl.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(x => {
      if (typeof x === 'string') {
        this.getUsers(x);
      }
    })
  }

  getUsers(input: string) {
    this.searchService.getUsers(input).subscribe(x => {
      this.filteredUsers = x.items;
      this.response = x;
    }, err => {
      if (err.status == 403) {
        this.snackBar.open('API rate limit exceeded. Rate limit will be reset on full minute.', 'Close', {
          duration: 5000
        });
      }
      else {
        this.snackBar.open('Error', 'Close', {
          duration: 3000
        });
      }
    })
  }

  selectUser(event: any) {
    this.router.navigate(['users/' + event.option.value.login]);
  }

  displayUser(user: User) {
    if (user && user.login) {
      return user.login;
    }
  }
}
