import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NavigationItemComponent,
  HeaderComponent,
  LayoutComponent,
  PageNotFoundComponent
} from './components';
import { MaterialModule } from '../shared';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
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
  imports: [CommonModule, MaterialModule, RouterModule],
})
export class CoreModule {}
