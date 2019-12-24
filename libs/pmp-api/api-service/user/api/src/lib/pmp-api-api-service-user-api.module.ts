import { Module } from '@nestjs/common';
import { PmpApiApiServiceUserCoreModule } from '@pimp-my-pr/pmp-api/api-service/user/core';
import { UserController } from './controllers/user.controller';

@Module({ imports: [PmpApiApiServiceUserCoreModule], controllers: [UserController] })
export class PmpApiApiServiceUserApiModule {}
