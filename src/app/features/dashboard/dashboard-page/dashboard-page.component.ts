import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  GridsterConfig,
  GridsterItem,
} from 'angular-gridster2';
import { map, Subject, takeUntil } from 'rxjs';
import { GRIDSTER_OPTIONS } from '../dashboard.config';
import { DashboardItem } from '../dashboard.types';
import { DashboardConfigService } from '../services/dashboard-config.service';
import { dashboardActions } from '../store/dashbord.actions';
import { selectDashbordItems } from '../store/dashbord.selectors';
@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public dashboardItems: DashboardItem[] = [];
  public options: GridsterConfig = {
    ...GRIDSTER_OPTIONS,
    itemChangeCallback: this.itemChange.bind(this),
  };

  constructor(
    private store: Store,
    private dashboardConfigService: DashboardConfigService,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.store
      .select(selectDashbordItems)
      .pipe(
        takeUntil(this.destroy$),
        map(items => JSON.parse(JSON.stringify(items))),
        map(items => items.map((item: DashboardItem) => {
          item.component = this.dashboardConfigService.WIDGETS_COMPONENTS_MAP[item.type];
          return item;
        }))
      )
      .subscribe(
        (items) => (this.dashboardItems = items)
      );
  }

  itemChange(
    item: GridsterItem,
  ): void {
    this.store.dispatch(
      dashboardActions.saveDashboardItem({ item: item as DashboardItem })
    );
  }

  trackByFn(_ndx: number, item: DashboardItem) {
    return item.id;
  }

  addStudentsWidget() {
    const item = this.dashboardConfigService.addNewWidget('StudentsWidget');
    this.store.dispatch(dashboardActions.addNewWidget({ item }))
  }
}
