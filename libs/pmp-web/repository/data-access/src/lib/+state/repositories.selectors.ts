import { createFeatureSelector, createSelector } from '@ngrx/store';
import { REPOSITORIES_FEATURE_KEY, RepositoriesState } from './repositories.reducer';

// Lookup the 'Repositories' feature state managed by NgRx
const getRepositoriesState = createFeatureSelector<RepositoriesState>(REPOSITORIES_FEATURE_KEY);

const getLoaded = createSelector(
  getRepositoriesState,
  (state: RepositoriesState) => state.loaded
);
const getError = createSelector(
  getRepositoriesState,
  (state: RepositoriesState) => state.error
);

const getAllRepositories = createSelector(
  getRepositoriesState,
  getLoaded,
  (state: RepositoriesState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getRepositoriesState,
  (state: RepositoriesState) => state.selectedId
);
const getSelectedRepositories = createSelector(
  getAllRepositories,
  getSelectedId,
  (repositories, id) => {
    const result = repositories.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const repositoriesQuery = {
  getLoaded,
  getError,
  getAllRepositories,
  getSelectedRepositories
};
