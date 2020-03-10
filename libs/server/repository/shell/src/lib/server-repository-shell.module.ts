import { Global, HttpService, Module } from '@nestjs/common';
import {
  PrRepository,
  RepositoryRepository,
  ReviewerRepository
} from '@pimp-my-pr/server/repository/core/domain-services';
import {
  BitbucketPrRepository,
  BitbucketRepositoryRepository,
  BitbucketReviewerRepository,
  GithubPrRepository,
  GithubRepositoryRepository,
  GithubReviewerRepository
} from '@pimp-my-pr/server/repository/infrastructure';
import { ServerRepositoryCoreApplicationServicesModule } from '@pimp-my-pr/server/repository/core/application-services';
import { PmpApiServiceConfigService } from '@pimp-my-pr/server/shared/core';

const providers = [
  {
    provide: PrRepository,
    useFactory: (configService: PmpApiServiceConfigService, httpService: HttpService) => {
      if (configService.getBitbucketToken()) {
        return new BitbucketPrRepository(httpService);
      }
      if (configService.getGithubToken()) {
        return new GithubPrRepository(httpService);
      }

      throw new Error('No PR repository initialized');
    },
    inject: [PmpApiServiceConfigService, HttpService]
  },
  {
    provide: RepositoryRepository,
    useFactory: (
      configService: PmpApiServiceConfigService,
      prRepository: PrRepository,
      httpService: HttpService
    ) => {
      if (configService.getBitbucketToken()) {
        return new BitbucketRepositoryRepository(httpService, configService);
      }
      if (configService.getGithubToken()) {
        return new GithubRepositoryRepository(httpService, prRepository, configService);
      }

      throw new Error('No Repository repository initialized');
    },
    inject: [PmpApiServiceConfigService, PrRepository, HttpService]
  },
  {
    provide: ReviewerRepository,
    useFactory: (configService: PmpApiServiceConfigService, httpService: HttpService) => {
      if (configService.getBitbucketToken()) {
        return new BitbucketReviewerRepository(httpService);
      }
      if (configService.getGithubToken()) {
        return new GithubReviewerRepository(httpService);
      }

      throw new Error('No Reviewer repository initialized');
    },
    inject: [PmpApiServiceConfigService, HttpService]
  }
];

@Global()
@Module({
  imports: [ServerRepositoryCoreApplicationServicesModule],
  providers: providers,
  exports: [...providers, ServerRepositoryCoreApplicationServicesModule]
})
export class ServerRepositoryShellModule {}
