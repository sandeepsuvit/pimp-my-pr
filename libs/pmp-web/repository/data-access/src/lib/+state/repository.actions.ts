import { Action } from '@ngrx/store';

export namespace fromRepositoryActions {
  export enum Types {
    GetRepository = '[Repository] Get Repository',
    GetRepositorySuccess = '[Repository] Get Repository Success',
    GetRepositoryFail = '[Repository] Get Repository Fail',
    GetRepositories = '[Repository] Get Repositories',
    GetRepositoriesSuccess = '[Repository] Get Repositories Success',
    GetRepositoriesFail = '[Repository] Get Repositories Fail'
  }

  export class GetRepository implements Action {
    readonly type = Types.GetRepository;
  }

  export class GetRepositoryFail implements Action {
    readonly type = Types.GetRepositoryFail;

    constructor(public payload: any) {}
  }

  export class GetRepositorySuccess implements Action {
    readonly type = Types.GetRepositorySuccess;
  }
  RepositoryLoaded;
  export class GetRepositories implements Action {
    readonly type = Types.GetRepositories;

    constructor(public payload: any) {}
  }

  export class GetRepositoriesSuccess implements Action {
    readonly type = Types.GetRepositoriesSuccess;

    constructor(public payload: any) {}
  }

  export class GetRepositoriesFail implements Action {
    readonly type = Types.GetRepositoriesFail;

    constructor(public payload: any) {}
  }

  export type CollectiveType =
    | GetRepository
    | GetRepositorySuccess
    | GetRepositoryFail
    | GetRepositories
    | GetRepositoriesSuccess
    | GetRepositoriesFail;
}
