import { Global, HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';

@Global()
@Module({
  imports: [ConfigModule, HttpModule],
  exports: [ConfigModule, HttpModule]
})
export class ServerSharedCoreModule {}
