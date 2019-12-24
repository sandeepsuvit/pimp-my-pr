import { Module } from '@nestjs/common';
import { PmpApiApiServiceRepositoryApiModule } from '@pimp-my-pr/pmp-api/api-service/repository/api';
import { PmpApiApiServiceUserApiModule } from '@pimp-my-pr/pmp-api/api-service/user/api';

@Module({ imports: [PmpApiApiServiceRepositoryApiModule, PmpApiApiServiceUserApiModule] })
export class PmpApiApiServiceShellModule {}
