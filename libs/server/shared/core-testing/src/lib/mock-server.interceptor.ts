import { HttpService, Injectable } from '@nestjs/common';
import { PmpApiServiceConfigService } from '@pimp-my-pr/server/shared/core';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class MockServerInterceptor {
  constructor(private pmpApiServiceConfigService: PmpApiServiceConfigService) {}

  intercept(req: AxiosRequestConfig): AxiosRequestConfig {
    req.url = this.getMockUrl(req.url);
    return req;
  }

  getMockUrl(originalUrl: string): string {
    const file =
      originalUrl
        .replace(/^(https?:|)\/\//, '')
        .split('/')
        .join('-') + '.json';
    return 'http://localhost:3321/' + file;
  }
}
