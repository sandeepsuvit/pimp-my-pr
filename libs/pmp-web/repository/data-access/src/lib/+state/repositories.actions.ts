import { Action } from '@ngrx/store';
import { Entity } from './repositories.reducer';

export enum RepositoriesActionTypes {
  LoadRepositories = '[Repositories] Load Repositories',
  RepositoriesLoaded = '[Repositories] Repositories Loaded',
  RepositoriesLoadError = '[Repositories] Repositories Load Error'
}

export class LoadRepositories implements Action {
  readonly type = RepositoriesActionTypes.LoadRepositories;
}

export class RepositoriesLoadError implements Action {
  readonly type = RepositoriesActionTypes.RepositoriesLoadError;
  constructor(public payload: any) {}
}

export class RepositoriesLoaded implements Action {
  readonly type = RepositoriesActionTypes.RepositoriesLoaded;
  constructor(public payload: Entity[]) {}
}

export type RepositoriesAction = LoadRepositories | RepositoriesLoaded | RepositoriesLoadError;

export const fromRepositoriesActions = {
  LoadRepositories,
  RepositoriesLoaded,
  RepositoriesLoadError
};
