import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Injectable()
export class UserFacade {
  constructor(private queryBus: QueryBus) {}
}
