import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { RepositoryPartialState } from './repository.reducer';
import { repositoryQuery } from './repository.selectors';
import { fromRepositoryActions } from './repository.actions';

@Injectable()
export class RepositoryFacade {
  loaded$ = this.store.pipe(select(repositoryQuery.getLoaded));
  repositories$ = this.store.pipe(select(repositoryQuery.getRepositories));

  constructor(private store: Store<RepositoryPartialState>) {}

  getRepositories() {
    this.store.dispatch(new fromRepositoryActions.GetRepositories({}));
  }
}
