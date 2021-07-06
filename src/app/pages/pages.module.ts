import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@shared/services';

import { PagesRoutingModule } from './pages-routing.module';

export function appInitializerFactory(authService: AuthService) {
  return () => authService.checkTheUserOnTheFirstLoad();
}
@NgModule({
  declarations: [],
  imports: [CommonModule, PagesRoutingModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      multi: true,
      deps: [AuthService],
    },
  ],
})
export class PagesModule {}
