import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { combineImgPayloadAsURL, conditionallySaveType, getToDoList, getUid, saveImageAndGetUrl } from "./common";
import { db } from "../firebase";

export async function addPainting(modalId, actionType, page) {
    const container = jQuery(`#${modalId}`);

    const collectionName = container.find(".collectionName").text();
    const saveBtn = container.find(".saveBtn");
    const oldBtnText = saveBtn.html();
    jQuery(saveBtn).html(`<i class="fa fa-spin fa-spinner"></i>`);
    const description = container.find(".description").val();
    const title = container.find(".title").val();
    const cost = container.find(".cost").val();
    console.log("container", { 'container.data()': container.data() })
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
        const randomId = container.data().galleryImageData?.id || getUid();
        payload.paintings = {
            [randomId]: {
                description: description || "",
                title,
                cost,
            },
        };

        if (actionType == 'create') {

            if (!description || !url) {
                jQuery(saveBtn).html(oldBtnText);
                alert("Missing img, description, title, or cost");
                return console.log("Save missing data");
            }
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

    const collection = `paintings/collections${page.route.id}`;
    console.log("addPainting", { payload, files, collection, page });
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



export async function saveEditOfCollectionType(modalId, actionType, page, tags) {
    const container = jQuery(`#${modalId}`);
    const modalData = container.data().galleryImageData;
    console.log("saveEditOfCollectionType", { modalData });
    const saveBtn = container.find(".saveBtn");
    const oldBtnText = saveBtn.html();
    jQuery(saveBtn).html(`<i class="fa fa-spin fa-spinner"></i>`);
    const description = container.find(".description").val();
    const type = container.find("select").select2("data")[0].id;

    conditionallySaveType(type, tags);

    let payload = {};

    const toDoList = getToDoList(jQuery(`#${modalId}`)) || [];
    const files = await saveImageAndGetUrl(toDoList, modalId);
    console.log("editCollection", { files });
    combineImgPayloadAsURL(payload, files);
    toDoList.forEach((imageName) => {
        // get meta data
        console.log({ imageName });
        const url = payload[imageName];

        payload[imageName] = {
            description: description || "",
            type,
        };
        if (url) {
            jQuery.extend(true, payload, {
                [imageName]: {
                    url,
                },
            });
        }
    });

    const collectionName = container.find(".collectionName").text();
    const dataId = modalData.id;
    console.log("editCollection", { payload, files, collectionName });

    const collectionRefDelete = doc(
        db,
        `paintings/collections/${collectionName}`,
        dataId
    );
    const fbDoc = await getDoc(collectionRefDelete)

    deleteDoc(collectionRefDelete)
    const collectionRef = doc(
        db,
        `paintings/collections/${collectionName}`,
        type
    );

    const thisPayload = jQuery.extend(true,
        fbDoc.data(),
        payload)
    // console.log({ collectionName });
    jQuery(`#${modalId}`).modal("hide");
    setDoc(collectionRef, thisPayload, { merge: true }).then(() => {
        // clear filesToSave
        container.find(".description").val("");
        jQuery(saveBtn).html(oldBtnText);
    });
}