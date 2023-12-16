
import { doc, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { setTagsListener } from '$lib/common';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
    console.log('load')

    setTagsListener()

    return {
        // posts: await db.getPostSummaries()
        testing: 'test'
    };
}

