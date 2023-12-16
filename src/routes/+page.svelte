<script>
  import Banner from "../components/Sections/banner.svelte";
  import Gallery from "../components/Gallery/gallery.svelte";
  import GalleryImage from "../components/Gallery/ImageType.svelte";
  import AddButton from "../components/General/addButton.svelte";
  import Modal from "../components/General/modal.svelte";
  import CommonCollectionType from "../components/Modals/commonCollectionType.svelte";
  import ClassesProxy from "./classes/classesProxy.svelte";
  import { dbb as fake_db } from "../fakeData";
  import AddClassModal from "./classes/addClassModal.svelte";
  import { isLoggedIn } from "../stores";
  import {
    combineImgPayloadAsURL,
    convertToGroupPayload,
    getToDoList,
    saveImageAndGetUrl,
  } from "$lib/common";
  import { onMount } from "svelte";
  import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
  import { db } from "../firebase";

  // import "$lib/firebase";

  const modalId = "createCollection";
  const createClassModalId = "createClass";
  const collections = Object.entries(fake_db.collections);

  onMount(() => {
    jQuery(`#${modalId}`).on("hidden.bs.modal", () => {
      // remove image file ImageSelection
      // reset preview image
      // clear description
      console.log("clearing modal inputs");
      jQuery(`#${modalId}`).get(0).reset();
      const previewImgDefault = jQuery(`#${modalId}`)
        .find(".imagePreview")
        .attr("data-previewImgDefault");
      jQuery(`#${modalId}`)
        .find(".imagePreview")
        .attr("src", previewImgDefault);
    });
    return () => {};
  });

  async function createCollectionType() {
    const container = jQuery(`#${modalId}`);
    const saveBtn = container.find(".saveBtn");
    const oldBtnText = saveBtn.html();
    jQuery(saveBtn).html(`<i class="fa fa-spin fa-spinner"></i>`);
    const description = container.find(".description").val();
    let payload = {
      description,
    };

    const toDoList = getToDoList(jQuery(`#${modalId}`)) || [];

    /**
     * I am having trouble save this because, saveImageAndGetUrl has bug wit this modal
     */

    console.log("createCollectionType", { toDoList });
    const files = await saveImageAndGetUrl(toDoList, modalId);
    console.log("convertToGroupPayload", {
      "jQuery.extend({},files)": jQuery.extend({}, files),
      "jQuery.extend({},payload) 1": jQuery.extend({}, payload),
    });
    combineImgPayloadAsURL(payload, files);
    console.log("convertToGroupPayload", {
      "jQuery.extend({},payload) 2": jQuery.extend({}, payload),
    });
    toDoList.forEach((imageName) => {
      // get meta data
      console.log({ imageName });
      const url = payload[imageName];

      const group = imageName.split("_")[0];
      const description = jQuery(`#${modalId}`)
        .find(`.imageSection.${group}`)
        .find(".description")
        .val();

      payload[imageName] = {
        description: description || "",
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
    // collectionName could be originals/reproductions
    // setting subCollection attr
    const collectionDocRef = doc(db, `paintings`, "collections");
    getDoc(collectionDocRef).then((doc) => {
      const docData = doc.data();

      setDoc(
        collectionDocRef,
        {
          ...docData,
          [collectionName]: true,
        },
        { merge: true }
      );
    });

    // adding the data
    const collectionRef = collection(
      db,
      `paintings/collections/${collectionName}`
    );
    console.log({ collectionName });
    addDoc(collectionRef, payload).then(() => {
      jQuery(`#${modalId}`).modal("hide");
      // clear filesToSave
      container.find(".description").val("");
      jQuery(saveBtn).html(oldBtnText);
      // urlsToSave = [];
    });
    console.log("createCollectionType", { payload, files });
  }

  // console.log({ collectionss });
  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";
</script>

<Banner />
<div class="container" data-component="home page">
  <!-- collections are firestone documents from the paintingsCollection: originals and reproductions  -->
  {#each collections as [title, colData]}
    <div class="galleryContainer">
      <span class="d-flex">
        <h2 class="collectionName">{title}</h2>
        <div class={ifLoggedInClass}>
          <AddButton {modalId} />
        </div>
      </span>
      <Gallery>
        {#each Object.entries(colData) as [id, { imgUrl }], index (id)}
          <div>
            <GalleryImage src={imgUrl} />
          </div>
        {/each}
      </Gallery>
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
