import { IQuery } from '@nestjs/cqrs';

export class ListRepositoriesStatisticsQuery implements IQuery {
  constructor(public token: string) {}
}
