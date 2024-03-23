<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { SlidersHorizontalIcon } from 'lucide-svelte';

	const url = $page.url;

	let filters = [
		{
			label: 'Rooms',
			icon: '/icons/rooms.jpg',
			key: 'rooms'
		},
		{
			label: 'Beach',
			icon: '/icons/beach.jpg',
			key: 'beach'
		},
		{
			label: 'Cabin',
			icon: '/icons/cabin.jpg',
			key: 'cabin'
		},
		{
			label: 'Camp',
			icon: '/icons/camp.jpg',
			key: 'camp'
		},
		{
			label: 'Country side',
			icon: '/icons/country-side.jpg',
			key: 'country-side'
		},
		{
			label: 'Trending',
			icon: '/icons/trending.jpg',
			key: 'trending'
		},
		{
			label: 'Caves',
			icon: '/icons/cave.jpg',
			key: 'cave'
		},
		{
			label: 'Castle',
			icon: '/icons/castle.jpg',
			key: 'castle'
		}
	];
</script>

<div class="flex items-center justify-between gap-8">
	<div class="flex items-center gap-4 overflow-hidden overflow-x-auto">
		{#each filters as filter (filter.key)}
			<button
				on:click={() => {
					let query = new URLSearchParams(url.searchParams.toString());

					query.set('filter-by', filter.key);

					goto(`?${query.toString()}`);
				}}
				class={cn(
					`group flex flex-col items-center gap-2 p-4 opacity-70 transition hover:opacity-100 active:scale-90`,
					$page.url.searchParams.get('filter-by') == filter.key && 'opacity-100'
				)}
			>
				<img src={filter.icon} alt={filter.key} class="h-6 w-6" />
				<span
					class={cn(
						'border-b-2 border-b-transparent pb-2 text-sm font-semibold transition group-hover:border-b-black/60',
						$page.url.searchParams.get('filter-by') == filter.key && 'border-b-black'
					)}
				>
					{filter.label}
				</span>
			</button>
		{/each}
	</div>
	<Button variant="outline" size="lg">
		<SlidersHorizontalIcon class="mr-2 h-4 w-4" />
		Filters
	</Button>
</div>
