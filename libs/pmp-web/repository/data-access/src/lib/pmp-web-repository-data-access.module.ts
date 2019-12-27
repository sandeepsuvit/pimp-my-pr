import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromRepository from './+state/repository.reducer';
import { RepositoryEffects } from './+state/repository.effects';
import { RepositoryFacade } from './+state/repository.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromRepository.REPOSITORY_FEATURE_KEY, fromRepository.reducer),
    EffectsModule.forFeature([RepositoryEffects])
  ],
  providers: [RepositoryFacade]
})
export class PmpWebRepositoryDataAccessModule {}
