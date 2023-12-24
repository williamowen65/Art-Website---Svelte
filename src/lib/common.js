import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { bannerData, classes, collectionDocData, newsletterData, originals, reproductions, tags } from "../stores";
import imageCompression from "browser-image-compression";


export function getUid(seed = "", log = true) {
    var now = new Date()
    var time = now.getTime()
    var uid = time.toString(36).toLocaleUpperCase()
        + "-"
        // 4 random characters in case we generate two uids in the same millisecond (1679615 = 36^4 - 1)
        + Math.round((Math.random() * 1679615)).toString(36).toLocaleUpperCase()
        + seed
    if (log) {
        // console.log("Generated uid %s", uid)
    }
    return uid;
}


export function readLocalFile(e) {
    const files = e.target.files;

    const theseFiles = {}

    return new Promise((res, rej) => {
        if (!Array.from(files).length) return res()
        // console.log("readLocalFile", { Array.from(files) })
        Array.from(files).forEach((file) => {
            theseFiles[file.name] = {}
            //   console.log("processing file");
            // Only process image files.
            if (!file.type.match("image.*")) return;

            var reader = new FileReader();


            reader.onload = (function (theFile) {
                return function (e) {


                    theseFiles[file.name] = {
                        theFile,
                        tempUrl: e.target.result,
                    }

                    const ready = Object.values(theseFiles).every((el) => el.tempUrl);
                    // console.log("possibly resolve ", { files, i, ready });
                    if (ready) res({ theseFiles });

                };
            })(file);
            // Read in the image file as a data URL.
            reader.readAsDataURL(file);
        })

    })
}

export function getToDoList(modal) {
    // find all image inputs
    // console.trace('getToDo')
    return jQuery(modal).find('input[type="file"]').toArray()
        .map(input => {
            return jQuery(input).attr('name')
        }).filter(imageName => {
            const files = jQuery(`input[name=${imageName}]`).prop('files')
            return true
        })
}

//@param toDoList - array of strings (name attr on image selections)
export async function saveImageAndGetUrl(toDoList, modalId) {
    // console.log("saveImageAndGetUrl", { toDoList })
    let files = {}

    // get file


    toDoList.forEach(imageName => {
        const images = jQuery(`#${modalId}`)
            .find(`input[name=${imageName}]`)


        const pic = images.prop("files")[0];
        if (pic) {
            files[imageName] = pic;
        }
        // console.log({ images, pic })
        // console.log("saveImageAndGetUrl", { images })
    })

    // console.log("saveImageAndGetUrl", {
    //     "jQuery.extend({},files)": jQuery.extend({}, files),
    // });

    //save files
    return await getUrls(files)

}

export async function getUrls(files) {


    console.log("getUrls", { files })

    for (let key in files) {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }

        // keep this other value
        const isMain = files[key].isMain
        files[key] = await imageCompression(files[key], options)
        files[key].isMain = isMain
    }
    return new Promise((res, rej) => {
        if (!Object.entries(files).length) return res(files)
        Object.entries(files)
            .forEach(([id, file], i) => {
                // console.log({ file });
                const galleryRef = ref(storage, file.name + `-${getUid()}`);
                uploadBytes(galleryRef, file)
                    .then(async (snapshot) => {
                        const url = await getDownloadURL(galleryRef);
                        files[id] = {
                            file: files[id],
                            url,
                        };
                    })
                    .then(() => {
                        const ready = Object.values(files).every((el) => el.url);

                        // console.log("possibly resolve ", { files, i, ready });
                        if (ready) res(files);
                    });
            });
    })
}

export function combineImgPayloadAsURL(payload, files) {

    for (let key in files) {
        if (files[key]) {
            jQuery.extend(true, payload, {
                [key]: files[key].url,
            });
        }
    }
}


export function convertToGroupPayload(payload) {
    // console.log("convertToGroupPayload", { payload })
    for (let groupImageKey in payload) {
        if (groupImageKey == 'description') continue
        const data = payload[groupImageKey]
        const description = data.description

        // image level descriptions are grouped together
        delete data.description

        const group = groupImageKey.split("_")[0];
        const image = groupImageKey
        if (!payload[group]) payload[group] = {}
        jQuery.extend(true, payload[group], {
            description,
            [image]: data
        })
        delete payload[groupImageKey]
    }
    // get groups from keys, combine them into objects.
    return payload
}

export function previewImage(e, options = {}) {
    // console.log("previewImage", { 'e.target': e.target })
    const src = jQuery(e.target).attr('src')
    const modal = jQuery('#imagePreviewModal')
    modal.find('.imagePreview').attr('src', src)
    if (options.title) {
        modal.find('title').text(options.title)
    }
    modal.modal('show')
}

export async function setTagsListener() {

    //tags
    const tagsDoc = doc(db, 'paintings', 'tags')
    await onSnapshot(tagsDoc, (doc) => {
        // console.log("tags listener", { 'doc.data()': doc.data() })

        tags.update(() => Object.entries(doc.data()).map(([id, tag]) => {
            return ({
                tag,
                id
            })
        }))
    })

    const originalsCollection = collection(db, 'paintings/collections/originals')
    await onSnapshot(originalsCollection, (snapshot) => {
        snapshot.docChanges().forEach(change => {
            const docData = change.doc.data()
            docData.id = change.doc.id
            docData.path = change.doc.ref.path
            if (change.type != 'removed') {

                originals.update((data) => {
                    data[docData.id] = docData
                    return data
                })
            } else {
                originals.update((data) => {
                    delete data[docData.id]
                    return data
                })
            }
        })
    })
    const reproductionsCollection = collection(db, 'paintings/collections/reproductions')
    await onSnapshot(reproductionsCollection, (snapshot) => {
        snapshot.docChanges().forEach(change => {
            const docData = change.doc.data()
            docData.id = change.doc.id
            docData.path = change.doc.ref.path
            if (change.type != 'removed') {

                reproductions.update((data) => {
                    data[docData.id] = docData
                    return data
                })
            } else {
                reproductions.update((data) => {
                    delete data[docData.id]
                    return data
                })
            }
        })
    })

    const newsletterDoc = doc(db, "textContent", "newsletter");
    await onSnapshot(newsletterDoc, (doc) => {
        // console.log("Current  newsletterData data: ", doc.data());
        const docData = doc.data()
        docData.path = doc.ref.path
        newsletterData.update(() => docData)
    });

    const collectionsDoc = doc(db, "paintings", "collections");
    await onSnapshot(collectionsDoc, (doc) => {
        // console.log("Current  newsletterData data: ", doc.data());
        collectionDocData.update(() => doc.data())
    });

    const bannerDoc = doc(db, "textContent", "banner");
    onSnapshot(bannerDoc, (doc) => {
        // console.log("Current data: ", doc.data());
        bannerData.update(() => doc.data())
    });

    const classesCollection = collection(db, 'classes')
    onSnapshot(classesCollection, (snapshot) => {
        snapshot.docChanges().forEach(change => {
            const doc = change.doc
            const docData = doc.data()
            docData.id = doc.id
            docData.path = doc.ref.path
            if (change.type != 'removed') {
                classes.update((data) => {
                    data[docData.id] = docData
                    return data
                })
            } else {
                classes.update((data) => {
                    delete data[docData.id]
                    return data
                })
            }

        })
    })
}

export function orderAlphabetical(array, sortBy) {
    const payload = array.sort((el_1, el_2) => el_1[sortBy] > el_2[sortBy] ? 1 : -1)
    console.log("orderAlphabetical", { payload })
    return payload
}

export function mapId(object, altKey) {
    if (!object) return []
    return Object.entries(object).map(([id, val]) => {
        if (altKey) {
            val[altKey] = id
        } else {
            val.id = id
        }
        return val
    })
}

export function conditionallySaveType(type, existingTags) {
    // console.log("conditionallySaveType", { type, existingTags })
    if (!existingTags.includes(type)) {
        const tagDoc = doc(db, 'paintings', 'tags')
        setDoc(tagDoc, {
            [type]: type
        }, { merge: true })
    }
}

export const hideAction = {
    remove: true
}

export function revealImage(e) {
    // console.log("revealImage", {})
    jQuery(e.target).addClass('reveal')
}


/**
 * Hash an array of objects by a key
 * @param {Object[]} array
 * @param {string} key
 * @param {Object} options
 *    strict {boolean} If true, throw error if key is absent;
 *    keyCase {string} Convert case of key before hashing.  'lower' or 'upper';
 *    verbose {boolean} Log a warning if key is absent;
 *    toString {boolean} Explicitly convert keys to strings.  Default false.
 * @return {Object} Object of form {key: Object from array}
 */
export function hashObjects(array, key, options) {
    options = options || {}
    var hash = {};
    array.forEach(function (object) {
        if (object[key] || object[key] === 0) {
            var thisKey = object[key];
            if (options.toString) thisKey = thisKey.toString();
            if (options.keyCase == 'upper') thisKey = thisKey.toLocaleUpperCase();
            if (options.keyCase == 'lower') thisKey = thisKey.toLocaleLowerCase();
            hash[thisKey] = object;
        } else {
            if (options.strict) throw new Error("Can't hash object because it doesn't have key " + key)
            if (options.verbose) console.warn("Can't hash object because it doesn't have key " + key + ": " + JSON.stringify(object))
        }
    })
    return hash
}


/**
 * Hash an array of objects by a key, where there may be multiple elements sharing the same key
 * @param {Object[]} array
 * @param {string} key
 * @param {Object} options
 *    strict {boolean} If true, throw error if key is absent;
 *    keyCase {string} Convert case of key before hashing.  'lower' or 'upper';
 *    verbose {boolean} Log a warning if key is absent;
 * @return {Object} Object of form {key: [Objects from array]}
 */
export function hashObjectsManyToOne(array, key, options) {
    options = options || {}
    var hash = {};
    array.forEach(function (object) {
        if (object[key] || object[key] === 0) {
            var thisKey = object[key];
            if (options.keyCase == 'upper') thisKey = thisKey.toLocaleUpperCase();
            if (options.keyCase == 'lower') thisKey = thisKey.toLocaleLowerCase()
            if (hash[thisKey]) {
                hash[thisKey].push(object);
            } else {
                hash[thisKey] = [object];
            }

        } else {
            if (options.strict) throw new Error("Can't hash object because it doesn't have key " + key)
            if (options.verbose) console.warn("Can't hash object because it doesn't have key " + key + ": " + JSON.stringify(object))
        }
    })
    return hash
}