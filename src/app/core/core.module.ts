import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NavigationItemComponent,
  HeaderComponent,
  LayoutComponent,
  PageNotFoundComponent
} from './components';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    HeaderComponent,
    NavigationItemComponent,
    PageNotFoundComponent,
    LayoutComponent,
    NavigationComponent,
  ],
  exports: [
    HeaderComponent,
    NavigationItemComponent,
    NavigationItemComponent,
    LayoutComponent,
    NavigationComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule],
})
export class CoreModule {}
