<script lang="ts">
	import { page } from '$app/stores';
	import { docStore } from 'sveltefire';

	import { firestore } from '$lib/firebase';
	import type { Listing } from '$lib/types';
	import Reserve from '$lib/components/app/Reserve.svelte';
	import { Skeleton } from '$lib/components/ui/skeleton';

	const listing = docStore<Listing>(firestore, `listing/${$page.params.id}`);
</script>

<div class="container mx-auto flex flex-col gap-8 py-8">
	{#if $listing?.title}
		<h3 class="scroll-m-20 px-4 text-2xl font-semibold tracking-tight">
			{$listing?.title}
		</h3>
	{:else}
		<Skeleton class="h-[20px] w-44 rounded-md" />
	{/if}
	<div class="grid grid-cols-1 gap-4 md:grid-cols-[70%_30%]">
		<div>
			<div class="flex flex-col gap-2 border-b px-4 pb-4">
				{#if $listing?.imgSrc}
					<img
						src={$listing?.imgSrc}
						alt={`${$listing?.title}_images`}
						class="aspect-video w-full rounded-lg object-cover object-center"
						draggable="false"
					/>
				{:else}
					<Skeleton class="aspect-video w-full rounded-lg" />
				{/if}
				{#if $listing?.category && $listing.location}
					<span class="scroll-m-20 text-xl font-semibold capitalize tracking-tight">
						{$listing?.category} in {$listing?.location}
					</span>
				{:else}
					<Skeleton class="h-3 w-24 rounded-md" />
				{/if}
				<span>
					{$listing?.guestCount} guests · {$listing?.roomCount} rooms · {$listing?.bathroomCount} bathrooms
				</span>
			</div>
			<div class="flex flex-col border-b p-4">
				{$listing?.description}
			</div>
		</div>
		<div class="relative">
			{#if $listing}
				<Reserve listing={$listing} />
			{:else}
				<Skeleton class="h-[300px] w-full rounded-md" />
			{/if}
		</div>
	</div>
</div>
