import * as fromDashbord from './dashbord.reducer';
import { selectDashbordState } from './dashbord.selectors';

describe('Dashbord Selectors', () => {
  it('should select the feature state', () => {
    const result = selectDashbordState({
      [fromDashbord.dashbordFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
