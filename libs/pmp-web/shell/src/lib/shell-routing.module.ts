import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DATA_ACCESS_API_URL } from '@pimp-my-pr/pmp-web/shell';

export function apiUrlFactory(): string {
  // Should return apiUrl from the env file;
  return '';
}

export const routes: Routes = [
  {
    path: 'repository',
    loadChildren: () =>
      import('@pimp-my-pr/pmp-web/repository/shell').then(m => m.PmpWebRepositoryShellModule)
  },
  {
    path: '',
    redirectTo: 'repository',
    pathMatch: 'full'
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  providers: [
    {
      provide: DATA_ACCESS_API_URL,
      useFactory: apiUrlFactory
    }
  ]
})
export class ShellRoutingModule {}
