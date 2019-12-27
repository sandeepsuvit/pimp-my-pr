import { RepositoriesAction, RepositoriesActionTypes } from './repositories.actions';

export const REPOSITORIES_FEATURE_KEY = 'repositories';

/**
 * Interface for the 'Repositories' data used in
 *  - RepositoriesState, and the reducer function
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface RepositoriesState {
  list: Entity[]; // list of Repositories; analogous to a sql normalized table
  selectedId?: string | number; // which Repositories record has been selected
  loaded: boolean; // has the Repositories list been loaded
  error?: any; // last none error (if any)
}

export interface RepositoriesPartialState {
  readonly [REPOSITORIES_FEATURE_KEY]: RepositoriesState;
}

export const initialState: RepositoriesState = {
  list: [],
  loaded: false
};

export function reducer(
  state: RepositoriesState = initialState,
  action: RepositoriesAction
): RepositoriesState {
  switch (action.type) {
    case RepositoriesActionTypes.RepositoriesLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }
  }
  return state;
}
