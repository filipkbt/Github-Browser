import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { SearchService } from 'src/app/core/services/search.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { SnackbarType } from 'src/app/core/enums/snackbar-type.enum';
@Component({
  selector: 'app-users-browser',
  templateUrl: './users-browser.component.html',
  styleUrls: ['./users-browser.component.scss']
})
export class UsersBrowserComponent implements OnInit {

  filteredUsers: User[] = [];
  githubUsernameFormControl = new FormControl(null, Validators.required);
  isLoading = false;
  constructor(
    private searchService: SearchService,
    private snackbarService: SnackbarService,
    private router: Router) { }

  ngOnInit(): void {
    this.githubUsernameFormControl.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(x => {
      if (typeof x === 'string') {
        this.getUsers(x);
      }
    });
  }

  getUsers(input: string) {
    this.searchService.getUsers(input).subscribe(x => {
      this.filteredUsers = x.items;
    }, err => {
      if (err.status === 403) {
        this.snackbarService.openSnackbar('API rate limit exceeded. Rate limit will be reset in the next minute.',
          'Close', 5000, SnackbarType.Error);
      } else {
        this.snackbarService.openSnackbar('Failed to load users.',
        'Close', 3000, SnackbarType.Error);
      }
    });
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
