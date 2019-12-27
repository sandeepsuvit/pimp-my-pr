import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';

import { RepositoryEffects } from './repository.effects';

describe('RepositoryEffects', () => {
  let actions: Observable<any>;
  let effects: RepositoryEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([])],
      providers: [RepositoryEffects, DataPersistence, provideMockActions(() => actions)]
    });

    effects = TestBed.get(RepositoryEffects);
  });
});
