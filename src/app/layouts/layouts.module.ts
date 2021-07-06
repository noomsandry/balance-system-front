import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesLayoutComponent } from './pages-layout/pages-layout.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PagesLayoutComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [PagesLayoutComponent],
})
export class LayoutsModule {}
