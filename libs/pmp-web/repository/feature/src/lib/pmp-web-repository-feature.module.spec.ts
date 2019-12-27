import { async, TestBed } from '@angular/core/testing';
import { PmpWebRepositoryFeatureModule } from './pmp-web-repository-feature.module';

describe('PmpWebRepositoryFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebRepositoryFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebRepositoryFeatureModule).toBeDefined();
  });
});
