import { derived, writable } from 'svelte/store';
import { dbb as dbb } from './fakeData';
import { hashObjects, hashObjectsManyToOne, mapId } from '$lib/common';
import { page } from '$app/stores';

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

export const modalIds = {
    createClassModalId: 'createClass',
    editClassModalId: "editClass",
    bannerModalId: "editBanner",
    createCollectionModalId: "createCollection",
    addPaintingModalId: "modalAddPainting",
    editGalleryCardModalId: "editGalleryCardModalId",
    imageBucketModalId: "imageBucketModalId",
}


export const isLoggedIn = writable(false)


export const filesToSave = writable({})



export const tags = writable([])
export const originals = writable({})
export const reproductions = writable({})
export const newsletterData = writable({})
export const classes = writable({})
export const images = writable({})
export const bannerDataInitial = writable()
export const bannerData = derived([bannerDataInitial, images], ([$bannerDataInitial, $images]) => {
    if ($bannerDataInitial) {
        const imageData = $images[$bannerDataInitial.imgId]
        Object.assign($bannerDataInitial, imageData)
    }
    return $bannerDataInitial || {}
})


// There needs to be a way to make this not iterable
// Array.prototype.__proto__.tap = function (cb) {
//     cb(this)
//     return this
// }

export const originalPaintings = derived(
    originals,
    ($originals) => hashObjects(
        Object.values(mapId($originals))
            .map(el => {
                const collectionType = el.id
                const path = el.path
                return Object.values(mapId(el.paintings))
                    .map(el => {
                        el.path = path
                        el.collectionType = collectionType
                        return el
                    })
            })
            .flat(), 'title', {})
);
export const reproductionPaintings = derived(
    reproductions,
    ($reproductions) => hashObjects(
        Object.values(mapId($reproductions))
            .map(el => {
                const collectionType = el.id
                const path = el.path
                return Object.values(mapId(el.paintings))
                    .map(el => {
                        el.path = path
                        el.collectionType = collectionType
                        return el
                    })
            })
            .flat(), 'title', {})
);

export const collectionsData = derived([originals, reproductions], ([$originals, $reproductions]) => {
    return ({
        originals: $originals,
        reproductions: $reproductions
    })
})

export const allPaintings = derived([originalPaintings, reproductionPaintings], ([$originalPaintings, $reproductionPaintings]) => {
    return ({
        ...$originalPaintings,
        ...$reproductionPaintings
    })
})

export const collectionDocData = writable({})


export const thisPainting = derived([page, originalPaintings, reproductionPaintings], ([$page, $originalPaintings, $reproductionPaintings]) => {

    if (!$page.params?.slug) return null
    return ({
        ...$originalPaintings,
        ...$reproductionPaintings
    })[$page.params.slug]
})


export const paintingsByType = derived([originalPaintings, reproductionPaintings], ([$originalPaintings, $reproductionPaintings]) => {
    const allPaintings = ({
        ...$originalPaintings,
        ...$reproductionPaintings
    })
    return hashObjectsManyToOne(
        Object.values(allPaintings),
        "collectionType"
    );
})