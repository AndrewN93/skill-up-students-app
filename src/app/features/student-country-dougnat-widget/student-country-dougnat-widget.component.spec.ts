import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCountryDougnatWidgetComponent } from './student-country-dougnat-widget.component';

describe('StudentCountryDougnatWidgetComponent', () => {
  let component: StudentCountryDougnatWidgetComponent;
  let fixture: ComponentFixture<StudentCountryDougnatWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCountryDougnatWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCountryDougnatWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
