<script lang="ts">
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { DateFormatter, getLocalTimeZone, type DateValue } from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { RangeCalendar } from '$lib/components/ui/range-calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { duration } from '$lib/stores/stayStore';

	const df = new DateFormatter('en-US', {
		dateStyle: 'medium'
	});

	let startValue: DateValue | undefined = undefined;
</script>

<div class="grid w-full gap-2">
	<Popover.Root openFocus>
		<Popover.Trigger asChild let:builder>
			<Button
				variant="outline"
				class={cn(
					'w-full justify-start text-left font-normal',
					!$duration && 'text-muted-foreground'
				)}
				builders={[builder]}
			>
				<CalendarIcon class="mr-2 h-4 w-4" />
				{#if $duration && $duration.start}
					{#if $duration.end}
						{df.format($duration.start.toDate(getLocalTimeZone()))} - {df.format(
							$duration.end.toDate(getLocalTimeZone())
						)}
					{:else}
						{df.format($duration.start.toDate(getLocalTimeZone()))}
					{/if}
				{:else if startValue}
					{df.format(startValue.toDate(getLocalTimeZone()))}
				{:else}
					Pick a date
				{/if}
			</Button>
		</Popover.Trigger>
		<Popover.Content class="w-auto p-0" align="start">
			<RangeCalendar
				bind:value={$duration}
				bind:startValue
				initialFocus
				numberOfMonths={2}
				placeholder={$duration?.start}
			/>
		</Popover.Content>
	</Popover.Root>
</div>
