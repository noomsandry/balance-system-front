import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { PagesLayoutComponent } from './pages-layout/pages-layout.component';

@NgModule({
  declarations: [PagesLayoutComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [PagesLayoutComponent],
})
export class LayoutsModule {}
