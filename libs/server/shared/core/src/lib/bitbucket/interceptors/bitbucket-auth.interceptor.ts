import { HttpService, Injectable } from '@nestjs/common';
import { PmpApiServiceConfigService } from '../../config/pmp-api-service.config';
import { AxiosRequestConfig } from 'axios';
import { AuthInterceptor } from '../../auth.interceptor';

@Injectable()
export class BitbucketAuthInterceptor extends AuthInterceptor {
  constructor(
    private httpService: HttpService,
    private pmpApiServiceConfigService: PmpApiServiceConfigService
  ) {
    super();
  }

  intercept(req: AxiosRequestConfig): AxiosRequestConfig {
    req.headers = {
      Authorization: 'Bearer ' + this.pmpApiServiceConfigService.getBitbucketToken(),
      ...req.headers,
      ['Content-Type']: 'application/json'
    };
    return req;
  }
}
