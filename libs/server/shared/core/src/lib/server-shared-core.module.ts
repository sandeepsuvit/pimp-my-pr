import { Global, HttpModule, HttpService, Module, OnModuleInit } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as fs from 'fs';
import { ConfigModule } from './config/config.module';
import { GithubAuthInterceptor } from './github/interceptors/github-auth.interceptor';

@Global()
@Module({
  imports: [ConfigModule, HttpModule],
  providers: [GithubAuthInterceptor],
  exports: [ConfigModule, HttpModule, GithubAuthInterceptor]
})
export class ServerSharedCoreModule implements OnModuleInit {
  constructor(
    private httpService: HttpService,
    private githubAuthInterceptor: GithubAuthInterceptor
  ) {}

  onModuleInit(): void {
    this.httpService.axiosRef.interceptors.request.use((req: AxiosRequestConfig) =>
      this.githubAuthInterceptor.intercept(req)
    );
    //
    this.httpService.axiosRef.interceptors.response.use((res: AxiosResponse<any>) => {
      //     const file = './mock/' + res.config.url.replace(/^(https?:|)\/\//, '').split('/').join( '-') + '.json';
      //     console.log(res.config.url)
      //     fs.writeFileSync(file, JSON.stringify(res.data, null, 2));
      return res;
    });
  }
}
