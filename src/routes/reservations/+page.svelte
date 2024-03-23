<script lang="ts">
	import { SignedIn, SignedOut, collectionStore, userStore } from 'sveltefire';

	import Button from '$lib/components/ui/button/button.svelte';
	import { setAuthModalOpen } from '$lib/stores/authModalStore';
	import { auth, firestore } from '$lib/firebase';
	import { collection, query, where } from 'firebase/firestore';
	import type { Reservations } from '$lib/types';
	import { buttonVariants } from '$lib/components/ui/button';

	const currentUser = userStore(auth);

	const resRef = collection(firestore, 'reservations');
	const q = query(resRef, where('userId', '==', $currentUser?.uid));

	const resColl = collectionStore<Reservations>(firestore, q as any);
</script>

<div class="container mx-auto flex flex-col gap-4">
	<SignedIn>
		<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">Your reservations</h4>
		{#each $resColl as res}
			<div class="flex flex-col gap-2 rounded-md border p-4">
				<p>Booked at {res.reservedAt} for {res.guest} guests</p>
				<span class="font-semibold">From {res.startDate} to {res.endData}</span>
				<a href={`/rooms/${res.listingId}`} class={buttonVariants({ variant: 'link' })}
					>View listing</a
				>
			</div>
		{/each}
	</SignedIn>
</div>
<SignedOut>
	<div class="flex items-center justify-center">
		<Button on:click={() => setAuthModalOpen()}>Sign in to view your reservations</Button>
	</div>
</SignedOut>
