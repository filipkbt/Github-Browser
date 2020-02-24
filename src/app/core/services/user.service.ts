import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly GIT_USERS_API_URL = environment.API_URL + "/users";

  constructor(private httpClient: HttpClient) { }  

  getUser(name: string): Observable<User>{
    return this.httpClient.get<User>(`${this.GIT_USERS_API_URL}/${name}`);
  }

  getUserRepos(name: string):Observable<Repo[]> {
    return this.httpClient.get<Repo[]>(`${this.GIT_USERS_API_URL}/${name}/repos`);
  }
}
