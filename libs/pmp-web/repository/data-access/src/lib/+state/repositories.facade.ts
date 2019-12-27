import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { RepositoriesPartialState } from './repositories.reducer';
import { repositoriesQuery } from './repositories.selectors';
import { LoadRepositories } from './repositories.actions';

@Injectable()
export class RepositoriesFacade {
  loaded$ = this.store.pipe(select(repositoriesQuery.getLoaded));
  allRepositories$ = this.store.pipe(select(repositoriesQuery.getAllRepositories));
  selectedRepositories$ = this.store.pipe(select(repositoriesQuery.getSelectedRepositories));

  constructor(private store: Store<RepositoriesPartialState>) {}

  loadAll() {
    this.store.dispatch(new LoadRepositories());
  }
}
