import { async, TestBed } from '@angular/core/testing';
import { PmpWebRepositoryDataAccessModule } from './pmp-web-repository-data-access.module';

describe('PmpWebRepositoryDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebRepositoryDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebRepositoryDataAccessModule).toBeDefined();
  });
});
