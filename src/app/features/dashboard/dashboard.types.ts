import { BaseWidget } from 'src/app/core/components/base-widget/base-widget.component';

export type WidgetsType = 'StudentsWidget';
export type WidgetComponentsMapType = Record<WidgetsType,Constructable<BaseWidget>>;
export type WidgetDefaultsMapType = Record<WidgetsType, DashboardItemCoords>;

interface Constructable<T> {
  new(...args: any) : T;
}
export class DashboardItemCoords {
  constructor(
    public cols: number,
    public rows: number,
    public y: number = 0,
    public x: number = 0,
  ) { }
}
export interface AbstractWidget {
  defaults: DashboardItemCoords;
  component: BaseWidget;
  type: string;
}
export interface DashboardItem {
  component?: Constructable<BaseWidget>;
  id: string;
  type: WidgetsType;
  cols: number;
  rows: number;
  y: number;
  x: number;
}
