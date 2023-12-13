import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

export function getUid(seed = "", log = true) {
    var now = new Date()
    var time = now.getTime()
    var uid = time.toString(36).toLocaleUpperCase()
        + "-"
        // 4 random characters in case we generate two uids in the same millisecond (1679615 = 36^4 - 1)
        + Math.round((Math.random() * 1679615)).toString(36).toLocaleUpperCase()
        + seed
    if (log) {
        console.log("Generated uid %s", uid)
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
        if (!Object.entries(files).length) return files
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