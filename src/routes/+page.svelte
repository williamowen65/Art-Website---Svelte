<script>
  import Banner from "../components/Sections/banner.svelte";
  import Gallery from "../components/Gallery/gallery.svelte";
  import GalleryImage from "../components/Gallery/ImageType.svelte";
  import AddButton from "../components/General/addButton.svelte";
  import Modal from "../components/General/modal.svelte";
  import CommonCollectionType from "../components/Modals/commonCollectionType.svelte";
  import ClassesProxy from "./classes/classesProxy.svelte";
  import AddClassModal from "./classes/addClassModal.svelte";
  import { isLoggedIn, tags } from "../stores";
  import {
    combineImgPayloadAsURL,
    conditionallySaveType,
    convertToGroupPayload,
    getToDoList,
    mapId,
    saveImageAndGetUrl,
  } from "$lib/common";
  import { onMount } from "svelte";
  import {
    addDoc,
    collection,
    doc,
    getDoc,
    onSnapshot,
    setDoc,
  } from "firebase/firestore";
  import { db } from "../firebase";
  import { ref } from "firebase/storage";

  // import "$lib/firebase";

  const modalId = "createCollection";
  const createClassModalId = "createClass";
  const collectionsDoc = doc(db, "paintings", "collections");
  let collectionDocData = {};
  let collectionsData = {};

  onSnapshot(collectionsDoc, (doc) => {
    // console.log("Current data: ", doc.data());
    collectionDocData = doc.data() || {};
    Object.keys(collectionDocData).forEach((key) => {
      // console.log("listening to ", { key });
      const collectionRef = collection(db, `paintings/collections/${key}`);
      onSnapshot(collectionRef, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const docData = change.doc.data();
          const docId = change.doc.id;
          const dataPath = change.doc.ref.path;
          docData.path = dataPath;
          if (change.type != "removed") {
            if (!collectionsData[key]) {
              collectionsData[key] = {};
            }
            collectionsData[key][docId] = docData;
          }

          collectionsData = JSON.parse(JSON.stringify(collectionsData));

          console.log({ docData, collectionsData });
        });
      });
    });
  });

  onMount(() => {
    /**
     * NOTE this modal component is called for the edit workflow via the individual cards
     * as well as the create button
     */
    jQuery(`#${modalId}`).on("hidden.bs.modal", () => {
      // remove image file ImageSelection
      // reset preview image
      // clear description
      // console.log("clearing modal inputs");
      jQuery(`#${modalId} form`).get(0).reset();
      const previewImgDefault = jQuery(`#${modalId}`)
        .find(".imagePreview")
        .attr("data-previewImgDefault");
      jQuery(`#${modalId}`)
        .find(".imagePreview")
        .attr("src", previewImgDefault);
      jQuery(`select`).val(null).trigger("change");
    });
    return () => {};
  });

  async function createCollectionType() {
    const container = jQuery(`#${modalId}`);
    const saveBtn = container.find(".saveBtn");
    const oldBtnText = saveBtn.html();
    jQuery(saveBtn).html(`<i class="fa fa-spin fa-spinner"></i>`);
    const description = container.find(".description").val();
    const type = container.find("select").select2("data")[0].id;

    conditionallySaveType(type, $tags);

    let payload = {};

    const toDoList = getToDoList(jQuery(`#${modalId}`)) || [];

    /**
     * I am having trouble save this because, saveImageAndGetUrl has bug wit this modal
     */

    // console.log("createCollectionType", { toDoList });
    const files = await saveImageAndGetUrl(toDoList, modalId);
    // console.log("convertToGroupPayload", {
    //   "jQuery.extend({},files)": jQuery.extend({}, files),
    //   "jQuery.extend({},payload) 1": jQuery.extend({}, payload),
    // });
    combineImgPayloadAsURL(payload, files);
    // console.log("convertToGroupPayload", {
    //   "jQuery.extend({},payload) 2": jQuery.extend({}, payload),
    // });
    for (let imageName of toDoList) {
      // get meta data
      console.log({ imageName });
      const url = payload[imageName];

      payload[imageName] = {
        description: description || "",
        type,
      };

      if (!description || !type || !url) {
        jQuery(saveBtn).html(oldBtnText);
        alert("Missing img, description, or type");
        return console.log("Save missing data");
      }

      if (url) {
        jQuery.extend(true, payload, {
          [imageName]: {
            url,
          },
        });
      }
    }

    const collectionName = container.find(".collectionName").text();
    // collectionName could be originals/reproductions
    // setting subCollection attr
    /**
     * Collection types "Originals" "reporductions are hard coded in databases"
     */
    // const collectionDocRef = doc(db, `paintings`, "collections");
    // getDoc(collectionDocRef).then((doc) => {
    //   const docData = doc.data();
    //   const docLength = Object.keys(docData).length;
    //   // SETTING THE COLLECTION TYPES
    //   setDoc(
    //     collectionDocRef,
    //     {
    //       [collectionName]: { index: docLength },
    //       ...docData,
    //     },
    //     { merge: true }
    //   );
    // });

    // adding the data
    console.log("createCollectionType", { payload, files });
    const collectionRef = collection(
      db,
      `paintings/collections/${collectionName}`
    );
    // console.log({ collectionName });
    addDoc(collectionRef, payload).then(() => {
      jQuery(`#${modalId}`).modal("hide");
      // clear filesToSave
      container.find(".description").val("");
      jQuery(saveBtn).html(oldBtnText);
      // urlsToSave = [];
    });
  }

  function sortByIndex(collectionDocData) {
    const sorted = Object.entries(collectionDocData)
      .sort(([collection_a, data_a], [collection_b, data_b]) => {
        console.log({ data_a, data_b });
        return data_a.index <= data_b.index ? -1 : 1;
      })
      .map(([key]) => key);
    console.log("sortByIndex", { sorted });
    return sorted;
  }

  // console.log({ collectionss });
  $: console.log({ collectionsData });
  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";
</script>

<Banner />
<div class="container" data-component="home page">
  <!-- collections are firestone documents from the paintingsCollection: originals and reproductions  -->
  {#each sortByIndex(collectionDocData) as title, index (title)}
    <div class="galleryContainer">
      <span class="d-flex">
        <h2 class="collectionName">{title}</h2>
        <div class={ifLoggedInClass}>
          <AddButton {modalId} />
        </div>
      </span>
      {#key collectionsData}
        <Gallery>
          {#each mapId(collectionsData[title]) as galleryImageData, index (galleryImageData.id)}
            <div>
              <!-- {@debug title} -->
              <GalleryImage {galleryImageData} collectionName={title} />
            </div>
          {/each}
        </Gallery>
      {/key}
    </div>
  {/each}

  <div class="classes">
    <span class="d-flex">
      <h2>Classes</h2>
      <div class={ifLoggedInClass}>
        <AddButton modalId={createClassModalId} />
      </div>
    </span>
    <ClassesProxy />
  </div>
</div>

<Modal id={modalId} showModal={false} data-collection-type>
  <span slot="headerText">Create <span class="collectionName"></span> type</span
  >
  <span slot="body">
    <CommonCollectionType {modalId} />
  </span>
  <span slot="footer">
    <button class="btn btn-primary saveBtn" on:click={createCollectionType}
      >Save</button
    >
  </span>
</Modal>

<AddClassModal id={createClassModalId} showModal={false} />

<style>
  .galleryContainer {
    margin: 100px 0px;
  }
</style>
