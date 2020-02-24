import { Branch } from './branch.model';

export class Repo {
  id: number;
  name: string;
  fork: boolean;
  branches_url: string;
  branches: Branch[];
}