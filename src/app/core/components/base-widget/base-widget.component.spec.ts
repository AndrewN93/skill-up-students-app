import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseWidget } from './base-widget.component';

describe('BaseWidget', () => {
  let component: BaseWidget;
  let fixture: ComponentFixture<BaseWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseWidget]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BaseWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
