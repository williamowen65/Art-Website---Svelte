<script>
  import Banner from "../components/Sections/banner.svelte";
  import Gallery from "../components/Gallery/gallery.svelte";
  import GalleryImage from "../components/Gallery/ImageType.svelte";
  import AddButton from "../components/General/addButton.svelte";
  import Modal from "../components/General/modal.svelte";
  import CommonCollectionType from "../components/Modals/commonCollectionType.svelte";
  import ClassesProxy from "./classes/classesProxy.svelte";
  import { db as fake_db } from "../fakeData";
  import AddClassModal from "./classes/addClassModal.svelte";
  import { isLoggedIn } from "../stores";
  import {
    combineImgPayloadAsURL,
    convertToGroupPayload,
    getToDoList,
    getUid,
    saveImageAndGetUrl,
  } from "$lib/common";

  // import "$lib/firebase";

  const modalId = "createCollection";
  const createClassModalId = "createClass";
  const collections = Object.entries(fake_db.collections);
  const modal_uid = getUid();

  async function createCollectionType() {
    const container = jQuery(`#${modalId}`);
    const saveBtn = container.find(".saveBtn");
    jQuery(saveBtn).html(`<i class="fa fa-spin fa-spinner"></i>`);
    const description = container.find(".description").val();
    let payload = {
      description,
    };

    const toDoList = getToDoList(jQuery(`#${modalId}`)) || [];
    console.log("createCollectionType", { toDoList });
    const files = await saveImageAndGetUrl(toDoList);

    combineImgPayloadAsURL(payload, files);
    toDoList.forEach((imageName) => {
      // get meta data
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

    convertToGroupPayload(payload);

    console.log("createCollectionType", { payload, files });
  }

  let attrs = {
    "data-modal_uid": modal_uid,
  };

  // console.log({ collectionss });
  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";
</script>

<Banner />
<div class="container">
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

<Modal id={modalId} showModal={false} {attrs}>
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
