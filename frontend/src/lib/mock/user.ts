import DateHelper from '../date-helper';
import type { UserStamp, UserParkVisit } from './types';

export const userParkVisits: UserParkVisit[] = [
  { code: 'MARI', timestamp: DateHelper.parse('2025-01-01T12:00-05:00') },
  { code: 'PETTI', timestamp: DateHelper.parse('2025-01-01T03:00-05:00') },
  { code: 'GOCR', timestamp: DateHelper.parse('2025-01-01T02:00-05:00') },
];

export const userStamps: UserStamp[] = [
  {
    code: 'MARI',
    timestamp: DateHelper.parse('2025-01-01T12:00-05:00'),
    location: null,
  },
  {
    code: 'CACR',
    timestamp: DateHelper.parse('2025-01-01T03:00-05:00'),
    location: null,
  },
  {
    code: 'JONE',
    timestamp: DateHelper.parse('2025-01-01T04:00-05:00'),
    location: null,
  },
  {
    code: 'ENRI',
    timestamp: DateHelper.parse('2025-01-01T02:00-05:00'),
    location: null,
  },
];
