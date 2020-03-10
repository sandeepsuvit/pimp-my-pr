import { Global, HttpModule, HttpService, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { GithubAuthInterceptor } from './github/interceptors/github-auth.interceptor';
import { AxiosRequestConfig } from 'axios';
import { PmpApiServiceConfigService } from './config/pmp-api-service.config';
import { BitbucketAuthInterceptor } from './bitbucket/interceptors/bitbucket-auth.interceptor';
import { AuthInterceptor } from './auth.interceptor';

@Global()
@Module({
  imports: [ConfigModule, HttpModule],
  providers: [
    {
      provide: AuthInterceptor,
      useFactory: (configService: PmpApiServiceConfigService, httpService: HttpService) => {
        if (configService.getBitbucketToken()) {
          return new BitbucketAuthInterceptor(httpService, configService);
        }
        if (configService.getGithubToken()) {
          return new GithubAuthInterceptor(httpService, configService);
        }

        throw new Error('No auth interceptor initialized');
      },
      inject: [PmpApiServiceConfigService, HttpService]
    }
  ],
  exports: [ConfigModule, HttpModule, AuthInterceptor]
})
export class ServerSharedCoreModule implements OnModuleInit {
  constructor(private httpService: HttpService, private interceptor: AuthInterceptor) {}

  onModuleInit(): void {
    this.httpService.axiosRef.interceptors.request.use((req: AxiosRequestConfig) =>
      this.interceptor.intercept(req)
    );
  }
}
