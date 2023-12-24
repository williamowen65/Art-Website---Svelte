<script>
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  import EditButton from "../General/buttons/editButton.svelte";
  import Modal from "../General/modal.svelte";
  import { onMount, afterUpdate } from "svelte";
  import CommonCollectionType from "../Modals/commonCollectionType.svelte";
  import { isLoggedIn } from "../../stores";
  import {
    combineImgPayloadAsURL,
    getToDoList,
    previewImage,
    saveImageAndGetUrl,
    hideAction,
    revealImage,
  } from "$lib/common";
  import { collection, doc, setDoc } from "firebase/firestore";
  import { db } from "../../firebase";
  import { page } from "$app/stores";
  import CommonPaintingModalBody from "../Modals/commonPaintingModalBody.svelte";
  import { addPainting } from "$lib/writeData";
  import GalleryCardModal from "../Modals/GalleryCardModal.svelte";
  import ActionsContainer from "../General/actionsContainer.svelte";
  import IsPublicButton from "../General/buttons/isPublicButton.svelte";

  const { galleryImageData, collectionName, type, path } = $$props;
  console.log({ galleryImageData, collectionName, type, path });
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
    // console.log({ "container.data()": container.data() });
    const modal_galleryImageData = container.data("galleryImageData");
    const collectionName = container.data("collectionName");

    // console.log("populateForm with card info", {
    //   modal_galleryImageData,
    //   "e.target": e.target,
    // });
    const galleryContainer = jQuery(e.target).closest(".galleryContainer");
    // console.log({ galleryContainer });

    container.find(".collectionName").text(collectionName);
    container.find(".imagePreview").attr("src", modal_galleryImageData.url);
    container.find(".description").val(modal_galleryImageData.description);
    container.find(".title").val(modal_galleryImageData.title);
    container.find(".cost").val(modal_galleryImageData.cost);
    container
      .find("input[name=public]")
      .prop("checked", modal_galleryImageData.isPublic);
  }
  // console.log("paintings page", { galleryImageData });
  function setData(jQuerySelection) {
    // console.log("setData", { galleryImageData });
    jQuerySelection.data({ galleryImageData, collectionName });
  }
</script>

<!-- {@debug galleryImageData} -->
<div class="">
  <div class="editBtn {ifLoggedInClass}">
    <ActionsContainer>
      <!-- {@debug path} -->
      <IsPublicButton
        isPublic={galleryImageData.isPublic}
        path={galleryImageData.path}
        isPainting={true}
        id={galleryImageData.id}
      />
      <EditButton contentType="collectionType" {modalId} {setData} />
    </ActionsContainer>
  </div>
  <a
    class="card"
    meta-page="src\components\Gallery\ImageType.svelte"
    data-path={path}
    href="{$page.url.pathname}/{galleryImageData.title}"
    data-type={type}
  >
    <!-- {@debug galleryImageData} -->
    <div class="position-relative card-img-container">
      <img
        src={galleryImageData.url}
        alt=""
        on:click={previewImage}
        class="conseal"
        on:load={revealImage}
      />
      <div class="hoverTextContainer">
        <div class="background"></div>
        <button class="btn btn-outline-light">Quick View</button>
      </div>
    </div>
    <div class="card-body d-flex flex-column">
      <div class="mt-2">
        <!-- {@html galleryImageData.cardBanner.description} -->
        <h5 class="card-title mb-0">{galleryImageData.title}</h5>
        <!-- <div class="card-text">
          <!-.- {@debug galleryImageData.cardBanner} -.->
          {galleryImageData.description}
        </div> -->
        <div>
          ${galleryImageData.cost}
        </div>
      </div>
    </div>
  </a>
</div>
<!-- 
  NOTE: I want to find a way to extract modal from this component to parent.
 -->

<GalleryCardModal
  {modalId}
  collectionType={$page.route.id?.slice(1)}
  thisPainting={galleryImageData}
/>

<style lang="scss">
  .card {
    cursor: pointer;
    /* width: 300px; */
    border-radius: 0;
    height: 100%;
    img {
      width: 100%;
    }
    color: initial;
    &:hover {
      text-decoration: none;
    }
  }
  .editBtn {
    position: relative;
    z-index: 1;
  }
</style>
