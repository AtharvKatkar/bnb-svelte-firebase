<script lang="ts">
	import { collectionStore } from 'sveltefire';
	import { firestore } from '$lib/firebase';

	import Filters from '$lib/components/app/Filters.svelte';
	import ListingComponent from '$lib/components/app/Listing.svelte';
	import { type Listing } from '$lib/types';

	const listings = collectionStore<Listing>(firestore, 'listing');
</script>

<div class="container mx-auto flex flex-col gap-8">
	<Filters />
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each $listings as data}
			<ListingComponent {data} />
		{/each}
	</div>
</div>
