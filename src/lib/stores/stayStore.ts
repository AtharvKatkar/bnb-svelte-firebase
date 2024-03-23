import { writable } from 'svelte/store';
import { CalendarDate, type DateValue } from '@internationalized/date';
import type { DateRange } from 'bits-ui';

export const duration = writable<DateRange>({
	start: new CalendarDate(new Date().getFullYear(), new Date().getMonth(), new Date().getDay()),
	end: new CalendarDate(new Date().getFullYear(), new Date().getMonth(), new Date().getDay()).add({
		days: 4
	})
});

export function setRange(range: DateRange) {
	duration.set(range);
}
