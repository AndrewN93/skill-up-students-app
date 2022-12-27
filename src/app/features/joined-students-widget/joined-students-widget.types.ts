import { DATE_RANGES } from 'src/app/constants/date.constants';
import { PartialDateTimeUnit } from 'src/app/types/date.types';
import { Student } from '../students/components/student.types';
export class WidgetConfig {
  constructor(
    public timeRange: PartialDateTimeUnit = DATE_RANGES.year,
    public timeKey: keyof Student = 'startDate',
  ) {}
}
export type StudentsWidgetData = (string | number)[];
export interface JoinedStudentsWidgetState {
  widgets: {
    [key: string]: {
      config: WidgetConfig;
      isLoading: boolean;
      data: StudentsWidgetData[];
    }
  }
}
