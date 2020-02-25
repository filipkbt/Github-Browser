import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { Repo } from 'src/app/core/models/repo.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User;
  userRepos: Repo[];
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(x => {
      this.getUserDetails(x.term);
    })
  }

  getUserDetails(username: string) {
    this.userService.getUser(username).subscribe(x => {
      this.user = x;
      this.getUserRepos();
    })
  }

  getUserRepos() {
    this.userService.getUserRepos(this.user.login).subscribe(x => {
      this.userRepos = x;
    });
  }

}
