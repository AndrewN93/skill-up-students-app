import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentCountryDougnatWidgetComponent } from './student-country-dougnat-widget.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    StudentCountryDougnatWidgetComponent
  ],
  exports: [
    StudentCountryDougnatWidgetComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatButtonModule,
  ]
})
export class StudentCountryDougnatWidgetModule { }
