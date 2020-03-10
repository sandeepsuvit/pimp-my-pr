import { HttpService, Injectable } from '@nestjs/common';
import { RepositoryRepository } from '@pimp-my-pr/server/repository/core/domain-services';
import { urlFactory } from '@valueadd/typed-urls';
import { bitbucketConfig, PmpApiServiceConfigService } from '@pimp-my-pr/server/shared/core';
import {
  RepositoryEntity,
  RepositoryNotFoundException
} from '@pimp-my-pr/server/repository/core/domain';
import { catchError, map, tap } from 'rxjs/operators';
import { catchRequestExceptions } from '@pimp-my-pr/server/shared/util-exception';
import { CoreException, CoreNotFoundException } from '@pimp-my-pr/server/shared/domain';
import { throwError } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { mapBitbucketRepository } from '../mappers/map-bitbucket-repository';
import { BitbucketRepositoryEnity } from '../domain/entities/bitbucket-repository.enity';
import { BitbucketUuidUtil } from '../utils/bitbucket-uuid.util';

@Injectable()
export class BitbucketRepositoryRepository extends RepositoryRepository {
  endpoints = {
    getRepository: urlFactory<'fullName'>(bitbucketConfig.apiUrl + '/repositories/:fullName', true),
    getRepositoryById: urlFactory<'repositoryId' | 'workspace'>(
      bitbucketConfig.apiUrl + '/repositories/:workspace/:repositoryId',
      true
    )
  };

  constructor(
    private httpService: HttpService,
    private pmpApiServiceConfigService: PmpApiServiceConfigService
  ) {
    super();
  }

  async findAll(): Promise<RepositoryEntity[]> {
    const repositories = this.pmpApiServiceConfigService.getRepositories();
    return Promise.all(repositories.map(repoId => this.getSingleRepositoryByName(repoId)));
  }

  getSingleRepositoryByName(fullName): Promise<RepositoryEntity> {
    return this.httpService
      .get<BitbucketRepositoryEnity>(this.endpoints.getRepository.url({ fullName }))
      .pipe(
        map((res: AxiosResponse) => res.data),
        map(mapBitbucketRepository),
        tap(data => console.log('repository id: ', data.id)),
        catchRequestExceptions(),
        catchError((error: AxiosError | CoreException) => {
          if (error instanceof CoreNotFoundException) {
            return throwError(new RepositoryNotFoundException(fullName));
          }
          return throwError(error);
        })
      )
      .toPromise();
  }

  // @TODO pass workspace dynamically
  getSingleRepository(id: string, workspace = 'valueadd'): Promise<RepositoryEntity> {
    return this.httpService
      .get<BitbucketRepositoryEnity>(
        this.endpoints.getRepositoryById.url({
          repositoryId: BitbucketUuidUtil.parseTo(id),
          workspace
        })
      )
      .pipe(
        map(res => res.data),
        map(mapBitbucketRepository),
        catchRequestExceptions(),
        catchError((error: AxiosError | CoreException) => {
          if (error instanceof CoreNotFoundException) {
            return throwError(new RepositoryNotFoundException(`${id}`));
          }
          return throwError(error);
        })
      )
      .toPromise();
  }
}
