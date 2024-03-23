<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { HeartIcon } from 'lucide-svelte';

	import type { Listing } from '$lib/types';

	export let data: Listing;
</script>

<a draggable="false" href={`/rooms/${data.id}`} class="group flex flex-col gap-2 p-4">
	<div class="relative overflow-hidden rounded-md">
		<Button
			size="icon"
			variant="ghost"
			class="absolute right-4 top-4 border-2 border-white text-white backdrop-blur"
		>
			<HeartIcon class="h-4 w-4" />
		</Button>
		<img
			src={data.imgSrc}
			alt="photo_url"
			class="aspect-square w-full rounded-md object-cover object-center"
			draggable="false"
		/>
	</div>
	<div class="flex flex-col">
		<span class="text-md font-bold">{data.title}, {data.location}</span>
		<span>$ {data.price} night</span>
	</div>
</a>
