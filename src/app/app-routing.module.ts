import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesLayoutComponent } from '@layouts/pages-layout/pages-layout.component';

const routes: Routes = [
  {
    path: '',
    component: PagesLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/pages.module').then(
            (m) => m.PagesModule
          ),
      },
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./auth/auth.module').then(
            (m) => m.AuthModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
