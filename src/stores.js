import { derived, writable } from 'svelte/store';
import { dbb as dbb } from './fakeData';
import { hashObjects, mapId } from '$lib/common';

// export const count = writable(0);
function createCount() {
    const { subscribe, set, update } = writable(0);

    return {
        subscribe,
        increment: () => update((n) => n + 1),
        decrement: () => update((n) => n - 1),
        reset: () => set(0)
    };
}

export const count = createCount();

/**
 * @type {HTMLDivElement}
 */
export let modal


export const isLoggedIn = writable(false)

export const filesToSave = writable({})


export const tags = writable([])
export const originals = writable({})
export const reproductions = writable({})
export const newsletterData = writable({})

export const originalPaintings = derived(
    originals,
    ($originals) => hashObjects(Object.values($originals).map(el => Object.values(mapId(el.paintings))).flat(), 'title', {})
);
export const reproductionPaintings = derived(
    reproductions,
    ($reproductions) => hashObjects(Object.values($reproductions).map(el => Object.values(mapId(el.paintings))).flat(), 'title', {})
);