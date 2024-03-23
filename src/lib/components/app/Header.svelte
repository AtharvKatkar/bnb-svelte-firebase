<script lang="ts">
	import { SignedIn, SignedOut, userStore } from 'sveltefire';
	import { BookMarkedIcon, LogInIcon, LogOutIcon, MenuIcon } from 'lucide-svelte';
	import { signOut } from 'firebase/auth';
	import { toast } from 'svelte-sonner';

	import { auth } from '$lib/firebase';
	import { buttonVariants } from '../ui/button';
	import * as Avatar from '$lib/components/ui/avatar/index';
	import Button from '../ui/button/button.svelte';
	import { setAuthModalOpen } from '$lib/stores/authModalStore';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { goto } from '$app/navigation';

	const currentUser = userStore(auth);

	function handleSignOut() {
		signOut(auth)
			.then(() => {
				toast.success('Logged out successfully');
			})
			.catch((err: any) => {
				toast.error('Failed to log out', {
					description: err.message
				});
			});
	}

	function bnbyrHome() {
		if (!$currentUser) {
			toast.info('Sign in to add your bnb');
			setAuthModalOpen();
			return;
		}

		goto('/new-bnb');
	}
</script>

<header
	class="container sticky left-0 right-0 top-0 z-10 flex items-center justify-between border-b bg-background p-6"
>
	<h2 class="scroll-m-20 text-3xl font-bold tracking-tighter transition-colors first:mt-0">
		bookbnb
	</h2>
	<nav class="self-center">
		<a class={buttonVariants({ variant: 'ghost', className: 'text-md rounded-full' })} href="/">
			Stays
		</a>
	</nav>
	<div class="flex items-center gap-2">
		<Button on:click={bnbyrHome} variant="ghost" class="font-semibold">Bnb your home</Button>
		<SignedIn let:user>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<button
						class="flex items-center gap-4 rounded-full border p-2 shadow transition hover:bg-border"
					>
						<Avatar.Root class="size-6">
							<Avatar.Image draggable="false" src={user.photoURL} alt={user.email} />
							<Avatar.Fallback>{user.email?.charAt(0).toUpperCase()}</Avatar.Fallback>
						</Avatar.Root>
						<MenuIcon class="h-6 w-6" />
					</button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label>My Account</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>
							<a href="/reservations" class="flex items-center">
								<BookMarkedIcon class="mr-2 h-4 w-4" />
								<span> My Reservations </span>
							</a>
						</DropdownMenu.Item>
						<DropdownMenu.Item on:click={handleSignOut}
							><LogOutIcon class="mr-2 h-4 w-4" /> Log out</DropdownMenu.Item
						>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</SignedIn>
		<SignedOut>
			<Button on:click={setAuthModalOpen} variant="outline">
				<LogInIcon class="mr-2 h-4 w-4" />
				Log in
			</Button>
		</SignedOut>
	</div>
</header>
