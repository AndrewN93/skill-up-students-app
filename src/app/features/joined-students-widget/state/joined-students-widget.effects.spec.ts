import { TestBed } from '@angular/core/testing';
import { JoinedStudentsWidgetEffects } from './joined-students-widget.effects';

describe('JoinedStudentsWidgetEffects', () => {
  let service: JoinedStudentsWidgetEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JoinedStudentsWidgetEffects);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
