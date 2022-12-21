import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedStudentsWidgetComponent } from './joined-students-widget.component';

describe('JoinedStudentsWidgetComponent', () => {
  let component: JoinedStudentsWidgetComponent;
  let fixture: ComponentFixture<JoinedStudentsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JoinedStudentsWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JoinedStudentsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
