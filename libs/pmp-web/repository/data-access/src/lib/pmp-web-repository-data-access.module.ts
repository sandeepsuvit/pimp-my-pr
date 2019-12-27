import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromRepositories from './+state/repositories.reducer';
import { RepositoriesEffects } from './+state/repositories.effects';
import { RepositoriesFacade } from './+state/repositories.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromRepositories.REPOSITORIES_FEATURE_KEY, fromRepositories.reducer),
    EffectsModule.forFeature([RepositoriesEffects])
  ],
  providers: [RepositoriesFacade]
})
export class PmpWebRepositoryDataAccessModule {}
