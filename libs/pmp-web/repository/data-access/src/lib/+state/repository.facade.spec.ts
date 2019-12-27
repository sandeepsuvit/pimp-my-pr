import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { RepositoryEffects } from './repository.effects';
import { RepositoryFacade } from './repository.facade';
import { initialState, reducer, RepositoryState } from './repository.reducer';

interface TestSchema {
  repository: RepositoryState;
}

describe('RepositoryFacade', () => {
  let facade: RepositoryFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('repository', reducer, { initialState }),
          EffectsModule.forFeature([RepositoryEffects])
        ],
        providers: [RepositoryFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}

      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(RepositoryFacade);
    });
  });
});
