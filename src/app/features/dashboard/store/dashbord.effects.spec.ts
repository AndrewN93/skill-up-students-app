import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DashbordEffects } from './dashbord.effects';

describe('DashbordEffects', () => {
  let actions$: Observable<any>;
  let effects: DashbordEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DashbordEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(DashbordEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
