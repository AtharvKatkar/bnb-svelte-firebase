<script>
	import { FirebaseApp } from 'sveltefire';

	import { auth } from '$lib/firebase';
	import '../app.pcss';
	import Header from '$lib/components/app/Header.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import Auth from '$lib/components/app/Auth.svelte';
</script>

<Toaster richColors />
<ModeWatcher defaultMode="light" />
<FirebaseApp {auth}>
	<Header />
	<slot />
	<Auth />
</FirebaseApp>
