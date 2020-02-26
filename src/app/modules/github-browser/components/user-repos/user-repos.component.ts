import { Component, OnInit, OnChanges, Input, ViewChild, SimpleChanges } from '@angular/core';
import { Repo } from 'src/app/core/models/repo.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RepoService } from 'src/app/core/services/repo.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.scss'], animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])],
})
export class UserReposComponent implements OnInit, OnChanges {

  @Input() userName: string;
  @Input() userRepos: Repo[];
  columnsToDisplay = ['name', 'fork'];
  expandedElement: Repo | null;
  dataSource: MatTableDataSource<Repo>;
  isLoadingBranches = false;
  @Input() isLoadingRepos;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private repoService: RepoService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userRepos'] && changes['userRepos'].currentValue) {
      this.userRepos = changes['userRepos'].currentValue.filter(x => !x.fork);
      this.dataSource = new MatTableDataSource(this.userRepos);
      this.dataSource.filterPredicate = (repo: Repo, filter: string) =>
        repo.name && repo.name.toLowerCase().indexOf(filter) !== -1;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  expandElement(element: any) {
    this.isLoadingBranches = true;
    this.repoService.getReposBranches(element.name, this.userName)
      .pipe(finalize(() => this.isLoadingBranches = false))
      .subscribe(x => {
        this.userRepos.find(x => x.name === element.name).branches = x;
      }, err => {
        this.snackBar.open('Failed to get branches connected with repo.', 'Close', {
          duration: 3000
        });
      });
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
