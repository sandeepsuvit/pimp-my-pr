import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellRoutingModule } from './shell-routing.module';
import { PmpWebRepositoryFeatureModule } from '@pimp-my-pr/pmp-web/repository/feature';

@NgModule({
  imports: [CommonModule, ShellRoutingModule, PmpWebRepositoryFeatureModule],
  exports: [ShellRoutingModule]
})
export class PmpWebRepositoryShellModule {}
