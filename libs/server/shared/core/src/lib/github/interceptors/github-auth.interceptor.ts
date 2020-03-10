import { HttpService, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { PmpApiServiceConfigService } from '../../config/pmp-api-service.config';
import { AuthInterceptor } from '../../auth.interceptor';

@Injectable()
export class GithubAuthInterceptor extends AuthInterceptor {
  constructor(
    private httpService: HttpService,
    private pmpApiServiceConfigService: PmpApiServiceConfigService
  ) {
    super();
  }

  intercept(req: AxiosRequestConfig): AxiosRequestConfig {
    req.headers = {
      Authorization: 'token ' + this.pmpApiServiceConfigService.getGithubToken(),
      ...req.headers
    };
    return req;
  }
}
