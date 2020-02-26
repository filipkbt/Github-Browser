import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Branch } from '../models/branch.model';

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  private readonly GIT_REPOS_API_URL = environment.API_URL + '/repos';

  constructor(private httpClient: HttpClient) { }

  getReposBranches(projectName: string, user: string): Observable<Branch[]> {
    return this.httpClient.get<Branch[]>(`${this.GIT_REPOS_API_URL}/${user}/${projectName}/branches`);
  }
}
