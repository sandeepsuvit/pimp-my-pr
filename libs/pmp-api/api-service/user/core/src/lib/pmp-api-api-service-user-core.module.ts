import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserFacade } from './user.facade';

const QueryHandlers = [];

@Module({
  imports: [CqrsModule],
  providers: [UserFacade, ...QueryHandlers],
  exports: [UserFacade]
})
export class PmpApiApiServiceUserCoreModule {}
