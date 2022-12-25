import { Injectable } from '@angular/core';
import { DateFormatingType, PartialDateTimeUnit } from '../types/date.types';
import { DateTime, DateTimeUnit } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  getRange(range: DateTimeUnit): [DateTime, DateTime] {
    return [DateTime.now().startOf(range), DateTime.now().endOf(range)];
  }
  
  convertToTimestamps(ranges: [DateTime, DateTime]): number[] {
    return ranges.map(r => r.toUnixInteger());
  }

  convertToISO(ranges: [DateTime, DateTime]): string[] {
    return ranges.map(r => r.toISO());
  }

  getEmptyRangeSlices<T>(range: DateTimeUnit) {
    const [startDate, endDate] = this.getRange(range);
    const splitBy: DateTimeUnit = range === 'year' ? 'month' : 'day';
    const format: DateFormatingType = this.resolveFormatting(range);
    const output: { [key: string]: T[] } = {};
    let pointer: DateTime = startDate;

    while (pointer < endDate) {
      output[pointer.toFormat(format)] = [];
      pointer = pointer.plus({ [splitBy]: 1 });
    }

    return output;
  }

  resolveFormatting(range: DateTimeUnit): DateFormatingType {
    return range === 'year' ? 'MMMM' : 'D';
  }

  splitDataByRange<T>(
    data: Array<T>,
    range: PartialDateTimeUnit,
    dateKey: keyof T
  ) {
    const format = this.resolveFormatting(range);
    const emptyRangeSlices = this.getEmptyRangeSlices<T>(range);

    return data.reduce((result, item) => {
      const dk = <string>item[dateKey];
      const group = DateTime.fromISO(dk).toFormat(format);
      if (result[group]) {
        result[group].push(item);
      } else {
        result[group] = [item];
      }
      return result;
    }, emptyRangeSlices);
  }
}
