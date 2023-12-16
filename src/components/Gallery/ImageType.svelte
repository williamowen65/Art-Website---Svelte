<script>
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  import EditButton from "../General/editButton.svelte";
  import Modal from "../General/modal.svelte";
  import { onMount, afterUpdate } from "svelte";
  import CommonCollectionType from "../Modals/commonCollectionType.svelte";
  import { isLoggedIn } from "../../stores";
  import {
    combineImgPayloadAsURL,
    getToDoList,
    saveImageAndGetUrl,
  } from "$lib/common";
  import { collection, doc, setDoc } from "firebase/firestore";
  import { db } from "../../firebase";

  const { galleryImageData, collectionName } = $$props;
  console.log({ collectionName });
  const modalId = "editCollection";
  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";

  onMount(() => {
    jQuery(`#${modalId}`).on("show.bs.modal", populateForm);
    return () => {
      jQuery(`#${modalId}`).modal("hide");
    };
  });

  function populateForm(e) {
    const container = jQuery(`#${modalId}`);
    console.log({ "container.data()": container.data() });
    const modal_galleryImageData = container.data("galleryImageData");

    console.log("populateForm with card info", {
      modal_galleryImageData,
      "e.target": e.target,
    });
    container
      .find(".imagePreview")
      .attr("src", modal_galleryImageData.cardBanner.url);
    container
      .find(".description")
      .val(modal_galleryImageData.cardBanner.description);
    container
      .find("select")
      .val(modal_galleryImageData.cardBanner.type)
      .trigger("change");
  }
  console.log({ galleryImageData });
  function setData(jQuerySelection) {
    console.log("setData", { galleryImageData });
    jQuerySelection.data("galleryImageData", galleryImageData);
  }

  async function saveEditOfCollectionType() {
    const container = jQuery(`#${modalId}`);
    const modalData = container.data().galleryImageData;
    console.log("saveEditOfCollectionType", { modalData });
    const saveBtn = container.find(".saveBtn");
    const oldBtnText = saveBtn.html();
    jQuery(saveBtn).html(`<i class="fa fa-spin fa-spinner"></i>`);
    const description = container.find(".description").val();
    const type = container.find("select").select2("data")[0].id;
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

    const collectionRef = doc(
      db,
      `paintings/collections/${collectionName}`,
      dataId
    );
    // console.log({ collectionName });
    jQuery(`#${modalId}`).modal("hide");
    setDoc(collectionRef, payload, { merge: true }).then(() => {
      // clear filesToSave
      container.find(".description").val("");
      jQuery(saveBtn).html(oldBtnText);
    });
  }
</script>

<!-- {@debug galleryImageData} -->
<div
  class="card"
  meta-page="src\components\Gallery\ImageType.svelte"
  data-path={galleryImageData.path}
>
  <div class={ifLoggedInClass}>
    <EditButton contentType="collectionType" {modalId} {setData} />
  </div>
  <!-- {@debug galleryImageData} -->
  <img src={galleryImageData.cardBanner?.url} alt="" />
  <div class="card-body d-flex flex-column">
    <div class="mt-2">
      <!-- {@html galleryImageData.cardBanner.description} -->
      <h5 class="card-title">{galleryImageData.cardBanner.type}</h5>
      <p class="card-text">
        <!-- {@debug galleryImageData.cardBanner} -->
        {galleryImageData.cardBanner.description}
      </p>
    </div>
  </div>
</div>

<div class={ifLoggedInClass}>
  <Modal id={modalId} showModal={false}>
    <span slot="headerText"
      >Edit <span class="collectionName">{collectionName}</span> type</span
    >
    <span slot="body">
      <CommonCollectionType {modalId} />
    </span>
    <span slot="footer">
      <button class="btn btn-primary">Remove</button>
      <button
        class="btn btn-primary saveBtn"
        on:click={saveEditOfCollectionType}>Save</button
      >
    </span>
  </Modal>
</div>

<style lang="scss">
  .card {
    cursor: pointer;
    /* width: 300px; */
    border-radius: 0;
    height: 100%;
    img {
      width: 100%;
    }
  }
</style>
