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