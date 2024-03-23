<script lang="ts">
	import { userStore, DownloadURL, UploadTask } from 'sveltefire';

	import { Input } from '$lib/components/ui/input';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { auth, firestore } from '$lib/firebase';
	import type { Listing } from '$lib/types';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toast } from 'svelte-sonner';
	import { doc, setDoc } from 'firebase/firestore';

	const user = userStore(auth);

	let formData = {
		title: '',
		bathroomCount: '',
		category: '',
		description: '',
		createdAt: new Date(),
		guestCount: '',
		id: crypto.randomUUID(),
		location: '',
		price: '',
		roomCount: '',
		imgSrc: '',
		userId: $user?.uid || ''
	};

	let file: File;

	function chooseFile(e: any) {
		file = e.target.files[0];
	}

	async function onSubmit() {
		await setDoc(doc(firestore, 'listing'), {
			formData,
			price: parseInt(formData.price)
		})
			.then((res) => {
				toast.success('Listing added');
			})
			.catch((err) => {
				toast.error('Failed to add listinh');
			});
	}
</script>

<div class="container mx-auto py-8">
	<h2 class="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">Bnb your home</h2>
	<p class="text-muted-foreground">Fill out this form to list your bnb</p>

	<form on:submit|preventDefault={onSubmit} class="flex w-full flex-col gap-2 md:w-3/4">
		<div>
			<Label>Title</Label>
			<Input bind:value={formData.title} placeholder="Title" />
		</div>
		<div>
			<Label>Description</Label>
			<Textarea bind:value={formData.description} placeholder="Description" />
		</div>
		<div>
			<Label>Guest count</Label>
			<Input bind:value={formData.guestCount} placeholder="Guest count" />
		</div>
		<div>
			<Label>Room count</Label>
			<Input bind:value={formData.roomCount} placeholder="Room count" />
		</div>
		<div>
			<Label>Location</Label>
			<Input bind:value={formData.location} placeholder="Located at" />
		</div>
		<div>
			<Label>Category</Label>
			<Input bind:value={formData.category} placeholder="Located at" />
		</div>
		<div>
			<Label>Price per night</Label>
			<Input bind:value={formData.price} placeholder="Price per night" />
		</div>
		<div>
			<Label>Upload image</Label>
			<Input accept="image/jpep" type="file" on:change={chooseFile} />
			{#if file}
				<UploadTask
					ref={`listing_${crypto.randomUUID()}.jpg`}
					data={file}
					let:progress
					let:snapshot
				>
					{#if snapshot?.state === 'running'}
						{progress}% uploaded
					{/if}

					{#if snapshot?.state === 'success'}
						<DownloadURL ref={snapshot?.ref} let:link>
							<Button
								on:click={() => {
									formData.imgSrc = `${link}`;
								}}>Link to listing</Button
							>
						</DownloadURL>
					{/if}
				</UploadTask>
			{/if}
		</div>
		<Button type="submit">Create my listing</Button>
	</form>
</div>
