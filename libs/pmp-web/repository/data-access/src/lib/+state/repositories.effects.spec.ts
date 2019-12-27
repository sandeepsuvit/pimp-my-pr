import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { RepositoriesEffects } from './repositories.effects';
import { LoadRepositories, RepositoriesLoaded } from './repositories.actions';

describe('RepositoriesEffects', () => {
  let actions: Observable<any>;
  let effects: RepositoriesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([])],
      providers: [RepositoriesEffects, DataPersistence, provideMockActions(() => actions)]
    });

    effects = TestBed.get(RepositoriesEffects);
  });

  describe('loadRepositories$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadRepositories() });
      expect(effects.loadRepositories$).toBeObservable(
        hot('-a-|', { a: new RepositoriesLoaded([]) })
      );
    });
  });
});
