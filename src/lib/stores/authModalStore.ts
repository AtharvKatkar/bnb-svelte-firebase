import { writable } from 'svelte/store';

export const open = writable<boolean>(false);

export function setAuthModalOpen() {
	open.set(true);
}

export function setAuthModalClose() {
	open.set(false);
}
