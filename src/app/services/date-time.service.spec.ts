import { TestBed } from '@angular/core/testing';
import { DateTime, DateTime as dt } from 'luxon';
import { PartialDateTimeUnit } from '../types/date.types';

import { DateTimeService } from './date-time.service';

const testData = Array.from({ length: 24 }, (_, k) => ({
  name: k,
  startDate: dt.now().endOf('month').plus({ month: k % 12 + 1 }).toISO(),
}));

describe('DateTimeService', () => {
  let service: DateTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should splitDataByRange group items correctly', () => {
    const result = service.splitDataByRange(testData, 'year', 'startDate');
    const resultLength = Object.keys(result).length;
    
    expect(resultLength).toBe(12);
    Object.values(result).forEach((entities) => {
      expect(entities.length).toBe(2);
    })
  });

  it('should getEmptyRangeSlices return emplty group items correctly', () => {
    const testExpectations: Record<PartialDateTimeUnit, number[]> = {
      year: [12],
      month: [28, 29, 30, 31],
      week: [7],
    };

    Object.entries(testExpectations).forEach(([period, expected]) => {
      const result = service.getEmptyRangeSlices(period as PartialDateTimeUnit);
      const isLengthThroughExpectedNumbers = expected.includes(Object.keys(result).length);

      expect(isLengthThroughExpectedNumbers).toBeTrue();
    });
  });

  it('should getRange return an array of two DateTime objects', () => {
    const result = service.getRange('year');
    expect(result.length).toBe(2);
    result.forEach(date => {
      expect(date).toBeInstanceOf(DateTime);
    });
  });
});
