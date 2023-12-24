<script>
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  import EditButton from "../General/buttons/editButton.svelte";
  import Modal from "../General/modal.svelte";
  import { onMount, afterUpdate } from "svelte";
  import CommonCollectionType from "../Modals/commonCollectionType.svelte";
  import { ifLoggedInClass, tags } from "../../stores";
  import {
    combineImgPayloadAsURL,
    getToDoList,
    saveImageAndGetUrl,
    hideAction,
    revealImage,
    collectionTypeToggleIsPublic,
  } from "$lib/common";
  import { collection, doc, setDoc } from "firebase/firestore";
  import { db } from "../../firebase";
  import { saveEditOfCollectionType } from "$lib/writeData";
  import { page } from "$app/stores";
  import ActionsContainer from "../General/actionsContainer.svelte";
  import IsPublicButton from "../General/buttons/isPublicButton.svelte";

  let card;
  const { galleryImageData, collectionName, type, hoverText } = $$props;
  // console.log({ collectionName });
  const modalId = "editCollection";

  onMount(() => {
    jQuery(`#${modalId}`).on("show.bs.modal", populateForm);
    jQuery(card).data(galleryImageData);
    return () => {
      jQuery(`#${modalId}`).modal("hide");
    };
  });

  function populateForm(e) {
    const container = jQuery(`#${modalId}`);
    // console.log({ "container.data()": container.data() });
    const modal_galleryImageData = container.data("galleryImageData");

    // console.log("populateForm with card info", {
    //   modal_galleryImageData,
    //   "e.target": e.target,
    // });
    container
      .find(".imagePreview")
      .attr("src", modal_galleryImageData.cardBanner.url);
    container
      .find(".description")
      .val(modal_galleryImageData.cardBanner.description);
    container
      .find("input[name=public]")
      .prop("checked", modal_galleryImageData.isPublic);
    container
      .find("select")
      .val(modal_galleryImageData.cardBanner.type)
      .trigger("change");
  }
  // console.log("create card", { galleryImageData });
  function setData(jQuerySelection) {
    // console.log("setData", { galleryImageData });
    jQuerySelection.data("galleryImageData", galleryImageData);
    jQuerySelection.find(".collectionName").text(collectionName);
  }
</script>

<!-- {@debug galleryImageData} -->
<div>
  <div class="editBtn {$ifLoggedInClass}">
    <ActionsContainer>
      <IsPublicButton
        isPublic={galleryImageData.isPublic}
        path={galleryImageData.path}
        toggleIsPublic={collectionTypeToggleIsPublic}
        dataSource={galleryImageData}
      />
      <EditButton
        contentType="collectionType"
        {modalId}
        {setData}
        {hideAction}
      />
    </ActionsContainer>
  </div>
  <a
    class="card"
    meta-page="src\components\Gallery\ImageType.svelte"
    data-path={galleryImageData.path}
    href="/{collectionName}#{galleryImageData.cardBanner.type}"
    data-type={type}
    bind:this={card}
  >
    <!-- {@debug galleryImageData} -->
    <div class="position-relative card-img-container">
      <img
        src={galleryImageData.cardBanner?.url}
        alt=""
        class="conseal"
        on:load={revealImage}
      />
      <h5 class="card-title">{galleryImageData.cardBanner.type}</h5>
      <div class="hoverTextContainer">
        <div class="background"></div>
        <button class="btn btn-outline-light">Quick View</button>
      </div>
    </div>
  </a>
</div>

<div class="{ifLoggedInClass} position-absolute">
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
        on:click={() =>
          saveEditOfCollectionType(modalId, "edit", $page.route.id, $tags)}
        >Save</button
      >
    </span>
  </Modal>
</div>

<style lang="scss">
  .editBtn {
    position: relative;
    z-index: 1;
  }
</style>
