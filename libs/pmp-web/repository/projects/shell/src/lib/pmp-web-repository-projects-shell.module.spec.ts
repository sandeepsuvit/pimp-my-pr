import { async, TestBed } from '@angular/core/testing';
import { PmpWebRepositoryProjectsShellModule } from './pmp-web-repository-projects-shell.module';

describe('PmpWebRepositoryProjectsShellModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmpWebRepositoryProjectsShellModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmpWebRepositoryProjectsShellModule).toBeDefined();
  });
});
