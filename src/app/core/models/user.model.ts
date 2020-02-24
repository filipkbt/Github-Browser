import { Repo } from './repo.model';

export class User {
    login: string;
    avatar_url: string;
    html_url: string;
    repos: Repo[];
  }
  
  export interface IUserResponse {
    total_count: number;
    items: User[];
  }