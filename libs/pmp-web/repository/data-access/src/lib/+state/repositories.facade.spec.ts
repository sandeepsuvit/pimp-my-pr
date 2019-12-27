import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { RepositoriesEffects } from './repositories.effects';
import { RepositoriesFacade } from './repositories.facade';

import { repositoriesQuery } from './repositories.selectors';
import { LoadRepositories, RepositoriesLoaded } from './repositories.actions';
import { RepositoriesState, Entity, initialState, reducer } from './repositories.reducer';

interface TestSchema {
  repositories: RepositoriesState;
}

describe('RepositoriesFacade', () => {
  let facade: RepositoriesFacade;
  let store: Store<TestSchema>;
  let createRepositories;

  beforeEach(() => {
    createRepositories = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('repositories', reducer, { initialState }),
          EffectsModule.forFeature([RepositoriesEffects])
        ],
        providers: [RepositoriesFacade]
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
      facade = TestBed.get(RepositoriesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allRepositories$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.allRepositories$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `RepositoriesLoaded` to manually submit list for state management
     */
    it('allRepositories$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allRepositories$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          new RepositoriesLoaded([createRepositories('AAA'), createRepositories('BBB')])
        );

        list = await readFirst(facade.allRepositories$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
