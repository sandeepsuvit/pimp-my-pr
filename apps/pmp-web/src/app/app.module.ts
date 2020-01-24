import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PmpWebRepositoryShellModule } from '@pimp-my-pr/pmp-web/repository/shell';
import { PmpWebUserShellModule } from '@pimp-my-pr/pmp-web/user/shell';
import { RouterModule } from '@angular/router';
import { PmpWebCoreModule } from '@pimp-my-pr/pmp-web/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot([]),
    PmpWebCoreModule,
    PmpWebRepositoryShellModule,
    PmpWebUserShellModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
