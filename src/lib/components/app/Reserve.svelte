<script lang="ts">
	import { getLocalTimeZone } from '@internationalized/date';
	import { page } from '$app/stores';
	import { SignedIn, SignedOut, userStore } from 'sveltefire';
	import { doc, setDoc } from 'firebase/firestore';
	import { MinusIcon, PlusIcon } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	import * as Card from '$lib/components/ui/card/index';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { Listing } from '$lib/types';
	import RangeSelector from './RangeSelector.svelte';
	import Label from '../ui/label/label.svelte';
	import { duration } from '$lib/stores/stayStore';
	import Auth from '$lib/components/app/Auth.svelte';
	import { firestore, auth } from '$lib/firebase';
	import { setAuthModalOpen } from '$lib/stores/authModalStore';

	export let listing: Listing;

	let guest = 1;

	const oneDay = 24 * 60 * 60 * 1000;

	let diffDays: number = 0;

	const user = userStore(auth);

	let totalPrice = 0;

	function calcDateDiff() {
		diffDays =
			Math.round(
				Math.abs(
					(($duration.end?.toDate(getLocalTimeZone()) as any) -
						($duration.start?.toDate(getLocalTimeZone()) as any)) /
						oneDay
				)
			) + 1;

		totalPrice = diffDays * listing.price;
	}

	async function fbRev() {
		await setDoc(doc(firestore, 'reservations', crypto.randomUUID()), {
			userId: $user?.uid,
			listingId: $page.params.id,
			startDate: $duration.start?.toDate(getLocalTimeZone()),
			endDate: $duration.end?.toDate(getLocalTimeZone()),
			totalPrice,
			reservedAt: new Date(),
			guest
		})
			.then((res) => {
				return res;
			})
			.catch((err: any) => {
				throw err;
			});
	}

	async function bookReservation() {
		calcDateDiff();

		totalPrice = diffDays * listing.price;

		toast.promise(fbRev(), {
			loading: 'Booking a reservation...',
			success: 'Reservation booked',
			error(error: any) {
				return `Failed to book a reservation. ${error.message}`;
			}
		});
	}
</script>

<Card.Root class="sticky left-0 right-0 top-0 h-fit">
	<Card.Header>
		<Card.Title>$ {listing?.price} night</Card.Title>
		<Card.Description>Get yourself a reserving</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="flex w-full flex-col gap-4">
			<Label>Add guests</Label>
			<div class="flex w-full items-center justify-evenly">
				<Button
					disabled={guest <= 1}
					variant="outline"
					class="rounded-full"
					size="icon"
					on:click={() => {
						guest--;
						calcDateDiff();
					}}
				>
					<MinusIcon class="h-6 w-6" />
				</Button>
				<span class="text-2xl">{guest}</span>
				<Button
					variant="outline"
					class="rounded-full"
					size="icon"
					on:click={() => {
						guest++;
						calcDateDiff();
					}}
				>
					<PlusIcon class="h-6 w-6" />
				</Button>
			</div>
			<div class="space-y-2">
				<Label>Select stay</Label>
				<RangeSelector />
			</div>
		</div>
	</Card.Content>
	<Card.Footer class="flex flex-col gap-4">
		<SignedIn>
			<Button on:click={bookReservation} class="w-full" size="lg">Reserve</Button>
		</SignedIn>
		<SignedOut>
			<Button on:click={() => setAuthModalOpen()}>Sign in</Button>
		</SignedOut>
		<div class="flex w-full flex-col gap-2">
			<span>For {diffDays} days</span>
			<span>With {guest} guests</span>
			<span>Estimated prices will be ${totalPrice} guests</span>
		</div>
	</Card.Footer>
</Card.Root>
