import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import {
  RepositoryFacade,
  ReviewerStatisticsReadModel
} from '@pimp-my-pr/server/repository/core/application-services';
import { ListRepositoriesResponse, UserStatistics } from '@pimp-my-pr/shared/domain';
import { Request, Response } from 'express';
import { ListReviewerStatisticsRequest } from '../requests/list-reviewer-statistics.request';
import { ListSingleRepositoryRequest } from '../requests/list-single-repository.request';
import { AuthGuard } from '@pimp-my-pr/server/auth/public';

@Controller()
@UseGuards(AuthGuard)
export class RepositoryController {
  constructor(private repositoryFacade: RepositoryFacade) {}

  @Get('repository')
  list(@Res() res: Response): Promise<ListRepositoriesResponse> {
    return this.repositoryFacade.listRepositoriesStatistics(res.locals.token);
  }

  @Get('repository/:repositoryId')
  listSingleRepository(
    @Req() request: Request,
    @Res() res: Response
  ): Promise<ListRepositoriesResponse> {
    return this.repositoryFacade.getRepositoryStatistics(
      new ListSingleRepositoryRequest(request).getParams(),
      res.locals.token
    );
  }

  @Get('reviewers')
  listReviewers(@Res() res: Response): Promise<UserStatistics[]> {
    return this.repositoryFacade.listReviewersStatistics(res.locals.token);
  }

  @Get('reviewers/:username')
  listReviewerStatistics(
    @Req() request: Request,
    @Res() res: Response
  ): Promise<ReviewerStatisticsReadModel> {
    return this.repositoryFacade.getReviewerStatistics(
      new ListReviewerStatisticsRequest(request).getParams(),
      res.locals.token
    );
  }
}
