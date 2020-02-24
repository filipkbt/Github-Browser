import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly GIT_SEARCH_API_URL = environment.API_URL + "/search";

  constructor(private httpClient: HttpClient) { }

  getUsers(name: string): Observable<IUserResponse> {
    return this.httpClient.get<IUserResponse>(`${this.GIT_SEARCH_API_URL}/users?q=${name}`);
  }
}
