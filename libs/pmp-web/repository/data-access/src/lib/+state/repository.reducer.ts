import { fromRepositoryActions } from './repository.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const REPOSITORY_FEATURE_KEY = 'repository';

export interface Repository {
  fullName: string;
  name: string;
  owner: string;
  prs: any[];
}
/**
 * Interface for the 'Repository' data used in
 *  - RepositoryState, and the reducer function
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */

export interface RepositoryEntityState extends EntityState<Repository> {}

export interface RepositoryPartialState {
  readonly [REPOSITORY_FEATURE_KEY]: RepositoryState;
}

export const adapter: EntityAdapter<Repository> = createEntityAdapter<Repository>();

export interface RepositoryState {
  repositories: RepositoryEntityState;
  loaded: boolean;
}

export const initialState: RepositoryState = {
  loaded: false,
  repositories: adapter.getInitialState()
};

export function reducer(
  state: RepositoryState = initialState,
  action: fromRepositoryActions.CollectiveType
): RepositoryState {
  switch (action.type) {
    case fromRepositoryActions.Types.GetRepositorySuccess: {
      state = {
        ...state,
        loaded: true
      };
      break;
    }
  }
  return state;
}

export const { selectAll } = adapter.getSelectors();
