import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'projects',
    loadChildren: () =>
      import('@pimp-my-pr/pmp-web/repository/projects/shell').then(
        m => m.PmpWebRepositoryProjectsShellModule
      )
  },
  {
    path: 'users',
    loadChildren: () =>
      import('@pimp-my-pr/pmp-web/repository/users/shell').then(
        m => m.PmpWebRepositoryUsersShellModule
      )
  },
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule {}
