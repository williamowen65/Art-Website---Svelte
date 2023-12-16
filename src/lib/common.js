import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { tags } from "../stores";


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
export async function saveImageAndGetUrl(toDoList) {
    let files = {}

    // get file
    return new Promise((res, rej) => {

        toDoList.forEach(imageName => {
            const pic = jQuery(document)
                .find(`input[name=${imageName}]`)
                .prop("files")[0];
            if (pic) {
                files[imageName] = pic;
            }
        })

        //save files
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
    console.log("convertToGroupPayload", { payload })
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

export function previewImage(e) {
    console.log("previewImage", { 'e.target': e.target })
    const src = jQuery(e.target).attr('src')
    const modal = jQuery('#imagePreviewModal')
    modal.find('.imagePreview').attr('src', src)
    modal.modal('show')
}

export async function setTagsListener() {
    const tagsDoc = doc(db, 'paintings', 'tags')
    await onSnapshot(tagsDoc, (doc) => {
        console.log("tags listener", { 'doc.data()': doc.data() })
        tags.update(() => doc.data())
    })
}