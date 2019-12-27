import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll, REPOSITORY_FEATURE_KEY, RepositoryState } from './repository.reducer';

// Lookup the 'Repository' feature state managed by NgRx
const getRepositoryState = createFeatureSelector<RepositoryState>(REPOSITORY_FEATURE_KEY);

const getLoaded = createSelector(
  getRepositoryState,
  (state: RepositoryState) => state.loaded
);

const getRepositoriesEntityState = createSelector(
  getRepositoryState,
  (state: RepositoryState) => state.repositories
);

const getRepositories = createSelector(
  getRepositoriesEntityState,
  selectAll
);

export const repositoryQuery = {
  getLoaded,
  getRepositories
};
