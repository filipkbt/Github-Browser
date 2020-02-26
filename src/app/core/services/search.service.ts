import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IUserResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly GIT_SEARCH_API_URL = environment.API_URL + '/search';

  constructor(private httpClient: HttpClient) { }

  getUsers(name: string): Observable<IUserResponse> {
    return this.httpClient.get<IUserResponse>(`${this.GIT_SEARCH_API_URL}/users?q=${name}`);
  }
}
