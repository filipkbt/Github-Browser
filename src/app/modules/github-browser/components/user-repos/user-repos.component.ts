import { Component, OnInit, OnChanges, Input, ViewChild, SimpleChanges } from '@angular/core';
import { Repo } from 'src/app/core/models/repo.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RepoService } from 'src/app/core/services/repo.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.scss'], animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),],
})
export class UserReposComponent implements OnInit, OnChanges {

  @Input() userName: string;
  @Input() userRepos: Repo[];
  columnsToDisplay = ['name', 'fork'];
  expandedElement: Repo | null;
  dataSource: MatTableDataSource<Repo>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private repoService: RepoService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userRepos'] && changes['userRepos'].currentValue) {
      this.userRepos = changes['userRepos'].currentValue.filter(x => !x.fork);
      this.dataSource = new MatTableDataSource(this.userRepos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  expandElement(element: any) {
    this.repoService.getReposBranches(element.name, this.userName).subscribe(x => {
      this.userRepos.find(x => x.name === element.name).branches = x;
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
