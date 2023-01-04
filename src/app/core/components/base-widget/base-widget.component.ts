/* eslint-disable @angular-eslint/directive-class-suffix */
/* eslint-disable @angular-eslint/directive-selector */
import { Directive, HostBinding, Input } from '@angular/core';
@Directive({
  selector: '[app-base-widget]',
})
export abstract class BaseWidget {
  @Input() set id(value: string) {
    this._id = value;
    this.checkInitialized();
  }
  protected _id!: string;
  @HostBinding('class') class = 'app-dashboard-widget';

  abstract checkInitialized(): void
}
