import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { RepositoriesPartialState } from './repositories.reducer';
import {
  LoadRepositories,
  RepositoriesLoaded,
  RepositoriesLoadError,
  RepositoriesActionTypes
} from './repositories.actions';

@Injectable()
export class RepositoriesEffects {
  @Effect() loadRepositories$ = this.dataPersistence.fetch(
    RepositoriesActionTypes.LoadRepositories,
    {
      run: (action: LoadRepositories, state: RepositoriesPartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return new RepositoriesLoaded([]);
      },

      onError: (action: LoadRepositories, error) => {
        console.error('Error', error);
        return new RepositoriesLoadError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<RepositoriesPartialState>
  ) {}
}
