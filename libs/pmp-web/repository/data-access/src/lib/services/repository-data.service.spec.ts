import { TestBed } from '@angular/core/testing';

import { RepositoryDataService } from './repository-data.service';

describe('RepositoryDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepositoryDataService = TestBed.get(RepositoryDataService);
    expect(service).toBeTruthy();
  });
});
