import { IQuery } from '@nestjs/cqrs';

export class ListReviewersStatisticsQuery implements IQuery {
  constructor(public token: string) {}
}
