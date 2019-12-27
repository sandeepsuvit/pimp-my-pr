import { Inject, Injectable, Optional } from '@angular/core';
import { apiEndpointFactory } from 'va-ts-endpoint';
import { DATA_ACCESS_API_URL } from '@pimp-my-pr/pmp-web/shell';

@Injectable({
  providedIn: 'root'
})
export class RepositoryDataService {
  readonly endpoints = {
    getRepositories: apiEndpointFactory(`${this.apiUrl}/repositories`)
  };

  constructor(@Optional() @Inject(DATA_ACCESS_API_URL) private apiUrl = '') {}
}
