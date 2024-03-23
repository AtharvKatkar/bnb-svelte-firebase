<script lang="ts">
	import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
	import { toast } from 'svelte-sonner';

	import { auth } from '$lib/firebase';
	import * as Dialog from '$lib/components/ui/dialog';
	import Button from '../ui/button/button.svelte';
	import { open, setAuthModalClose } from '$lib/stores/authModalStore';

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();

		await signInWithPopup(auth, provider)
			.then((res) => {
				setAuthModalClose();
				return res.user.email;
			})
			.catch((err) => {
				throw err;
			});
	}

	async function handleSignInWithGoogle() {
		toast.promise(signInWithGoogle, {
			loading: 'Waiting for Google sign in',
			success(data: any) {
				return `Signed in as ${data}`;
			},
			error(error) {
				console.log('OAuth Failed', error);
				return `Failed to sign in using google`;
			}
		});
	}
</script>

<Dialog.Root bind:open={$open}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Login or sign up</Dialog.Title>
			<Dialog.Description>
				Use your email address or log in using your Google account
			</Dialog.Description>
		</Dialog.Header>
		<div class="flex flex-col gap-2">
			<Button on:click={handleSignInWithGoogle}>Continue using Google</Button>
			<Button variant="ghost" on:click={setAuthModalClose}>Close</Button>
		</div>
	</Dialog.Content>
</Dialog.Root>
