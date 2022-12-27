import { Injectable } from '@angular/core';
import { WIDGETS_COMPONENTS_MAP, WIDGETS_DEFAULTS_MAP, AVAILABLE_WIDGETS } from '../dashboard.config';
import { WidgetsType, DashboardItem } from '../dashboard.types';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DashboardConfigService {
  public readonly WIDGETS_COMPONENTS_MAP = WIDGETS_COMPONENTS_MAP;
  public readonly WIDGETS_DEFAULTS_MAP = WIDGETS_DEFAULTS_MAP;
  public readonly AVAILABLE_WIDGETS = AVAILABLE_WIDGETS;

  isWidgetRegistered(widgetType: WidgetsType): boolean {
    return (
      this.WIDGETS_COMPONENTS_MAP[widgetType]
      && this.WIDGETS_DEFAULTS_MAP[widgetType]
      && this.AVAILABLE_WIDGETS.includes(widgetType)
    )
  }
  
  addNewWidget(widget: WidgetsType): DashboardItem{
    if (!this.isWidgetRegistered(widget)) {
      throw new Error(`There is no - "${widget}" regiesterd in dashboard configuration!`);
    }

    return {
      id: uuidv4(),
      type: widget,
      ...this.WIDGETS_DEFAULTS_MAP[widget],
    }
  }
}
