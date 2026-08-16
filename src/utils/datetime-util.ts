import type { Event } from '../data/events/timestamps';

export const timespanToWrittenTime = (
  period: Event['periods'][number],
): string => {
  return `${period.from.hours}:${period.from.minutes || '00'} - ${period.to.hours}:${period.to.minutes || '00'}`;
};
