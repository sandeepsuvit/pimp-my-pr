import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ServerRepositoryApiRestModule } from '@pimp-my-pr/server/repository/api-rest';
import { RepositoryFacade } from '@pimp-my-pr/server/repository/core/application-services';
import { ServerSharedCoreModule } from '@pimp-my-pr/server/shared/core';
import * as request from 'supertest';

describe('Application', () => {
  let app: INestApplication;
  const repositoryFacade = {
    getRepositoryStatistics: params => [params],
    getReviewerStatistics: params => [params],
    listRepositoriesStatistics: () => ['repositories'],
    listReviewersStatistics: () => ['reviewers']
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ServerRepositoryApiRestModule, ServerSharedCoreModule]
    })
      .overrideProvider(RepositoryFacade)
      .useValue(repositoryFacade)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  test(`/GET repositories statistics`, () => {
    return request(app.getHttpServer())
      .get('/repository')
      .expect(200, { data: ['repositories'], error: null });
  });

  test(`/GET reviewers statistics`, () => {
    return request(app.getHttpServer())
      .get('/reviewers')
      .expect(200, { data: ['reviewers'], error: null });
  });

  test(`/GET repository statistics`, () => {
    return request(app.getHttpServer())
      .get('/repository/1234123')
      .expect(200, { data: [{ repositoryId: '1234123' }], error: null });
  });

  test(`/GET reviewer statistics`, () => {
    return request(app.getHttpServer())
      .get('/reviewers/username')
      .expect(200, { data: [{ username: 'username' }], error: null });
  });

  afterAll(async () => {
    await app.close();
  });
});
