import { GridType, CompactType, DisplayGrid } from 'angular-gridster2'
import { JoinedStudentsWidgetComponent } from '../joined-students-widget/components/joined-students-widget.component'
import { WidgetComponentsMapType, WidgetDefaultsMapType, DashboardItemCoords, WidgetsType } from './dashboard.types'

export const WIDGETS_COMPONENTS_MAP: WidgetComponentsMapType = {
  StudentsWidget: JoinedStudentsWidgetComponent
}
export const WIDGETS_DEFAULTS_MAP: WidgetDefaultsMapType = {
  StudentsWidget: new DashboardItemCoords(6, 5),
}
export const AVAILABLE_WIDGETS: WidgetsType[] = ['StudentsWidget'];


export const GRIDSTER_OPTIONS = {
  gridType: GridType.VerticalFixed,
  compactType: CompactType.CompactUp,
  displayGrid: DisplayGrid.OnDragAndResize,
  setGridSize: true,
  margin: 10,
  useBodyForBreakpoint: false,
  minCols: 12,
  maxCols: 12,
  minRows: 1,
  pushItems: true,
  maxItemCols: 12,
  minItemCols: 1,
  maxItemRows: 12,
  minItemRows: 1,
  minItemArea: 1,
  defaultItemCols: 1,
  defaultItemRows: 1,
  fixedColWidth: 105,
  fixedRowHeight: 105,
  scrollSensitivity: 10,
  scrollSpeed: 20,
  enableEmptyCellClick: false,
  enableEmptyCellContextMenu: false,
  enableEmptyCellDrop: false,
  enableEmptyCellDrag: false,
  enableOccupiedCellDrop: false,
  emptyCellDragMaxCols: 50,
  emptyCellDragMaxRows: 50,
  ignoreMarginInRow: false,
  draggable: {
    enabled: true,
  },
  resizable: {
    enabled: true,
  },
  swap: false,
  pushDirections: { north: true, east: true, south: true, west: true },
  disableWindowResize: false,
  disableWarnings: false,
  scrollToNewItems: false,
}