import { HttpService, Module, OnModuleInit } from '@nestjs/common';
import { ServerSharedCoreModule } from '@pimp-my-pr/server/shared/core';
import { MockServerInterceptor } from './mock-server.interceptor';
import { AxiosRequestConfig } from 'axios';

@Module({
  imports: [ServerSharedCoreModule],
  providers: [MockServerInterceptor],
  exports: [ServerSharedCoreModule]
})
export class ServerSharedCoreTestingModule implements OnModuleInit {
  constructor(
    private httpService: HttpService,
    private mockServerInterceptor: MockServerInterceptor
  ) {}

  onModuleInit(): void {
    this.httpService.axiosRef.interceptors.request.use((req: AxiosRequestConfig) =>
      this.mockServerInterceptor.intercept(req)
    );
    //
    // this.httpService.axiosRef.interceptors.response.use((res: AxiosResponse<any>) => {
    //     const file = './mock/' + res.config.url.replace(/^(https?:|)\/\//, '').split('/').join( '-') + '.json';
    //     console.log(res.config.url)
    //     fs.writeFileSync(file, JSON.stringify(res.data, null, 2));
    // return res;
    // }
    // );
  }
}
