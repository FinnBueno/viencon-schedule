import { useEffect, type FC } from 'react';
import { EVENTS } from '../data/events';
import { useSearch } from '../context/SearchContext';
import { GRID_ID } from './grid';
import { EventItem } from './event-item';

export const Events: FC<unknown> = () => {
  const { currentResult } = useSearch();

  useEffect(() => {
    if (!currentResult) return;

    const parent = document.getElementById(GRID_ID);
    const target = document.getElementById(currentResult);
    const parentBounds = parent?.getBoundingClientRect();
    const targetBounds = target?.getBoundingClientRect();
    if (!parent || !target || !parentBounds || !targetBounds) return;

    const offset = targetBounds.left - parentBounds.left - 140;
    parent.scrollBy({ left: offset, behavior: 'smooth' });
  }, [currentResult]);

  return (
    <>
      {EVENTS.map((event) => {
        return event.periods.map((timespan) => (
          <EventItem
            timespan={timespan}
            event={event}
            currentHighlight={currentResult}
          />
        ));
      })}
    </>
  );
};
