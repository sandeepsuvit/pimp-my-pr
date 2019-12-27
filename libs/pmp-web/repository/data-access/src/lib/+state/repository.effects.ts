import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { RepositoryPartialState } from './repository.reducer';
import { fromRepositoryActions } from '@pimp-my-pr/pmp-web/repository/data-access';

@Injectable()
export class RepositoryEffects {
  @Effect() loadRepositories$ = this.dataPersistence.fetch(
    fromRepositoryActions.Types.GetRepositories,
    {
      run: (action: fromRepositoryActions.GetRepositories, state: RepositoryPartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return new fromRepositoryActions.GetRepositoriesSuccess([]);
      },

      onError: (action: fromRepositoryActions.GetRepositories, error) => {
        console.error('Error', error);
        return new fromRepositoryActions.GetRepositoriesFail(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<RepositoryPartialState>
  ) {}
}
