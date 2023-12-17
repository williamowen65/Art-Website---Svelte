export function addPainting(modalId) {
    const container = jQuery(`#${modalId}`);

    const collectionName = container.find(".collectionName").text();
    const saveBtn = container.find(".saveBtn");
    const oldBtnText = saveBtn.html();
    jQuery(saveBtn).html(`<i class="fa fa-spin fa-spinner"></i>`);
    const description = container.find(".description").val();
    const title = container.find(".title").val();
    const cost = container.find(".cost").val();

    let payload = {};

    const toDoList = getToDoList(jQuery(`#${modalId}`)) || [];
    const files = await saveImageAndGetUrl(toDoList, modalId);
    combineImgPayloadAsURL(payload, files);
    for (let imageName of toDoList) {
        // get meta data
        // console.log({ imageName });
        const url = payload[imageName];
        delete payload[imageName];

        payload.paintings = {};
        const randomId = getUid();
        payload.paintings = {
            [randomId]: {
                description: description || "",
                title,
                cost,
            },
        };

        if (!description || !url) {
            jQuery(saveBtn).html(oldBtnText);
            alert("Missing img, description, title, or cost");
            return console.log("Save missing data");
        }

        if (url) {
            jQuery.extend(true, payload, {
                paintings: {
                    [randomId]: {
                        url,
                    },
                },
            });
        }
    }

    const collection = "paintings/collections/originals";
    console.log("addPainting", { payload, files, collection });
    // debugger;
    const collectionRef = doc(db, collection, collectionName);
    setDoc(collectionRef, payload, { merge: true }).then(() => {
        jQuery(`#${modalId}`).modal("hide");
        //   // clear filesToSave
        container.find(".description").val("");
        jQuery(saveBtn).html(oldBtnText);
        //   // urlsToSave = [];
    });
}