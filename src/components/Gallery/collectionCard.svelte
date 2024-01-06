<script>
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  import EditButton from "../General/buttons/editButton.svelte";
  import Modal from "../General/modal.svelte";
  import { onMount, afterUpdate } from "svelte";
  import CommonCollectionType from "../Modals/common/commonCollectionType.svelte";
  import { isLoggedIn, tags } from "../../stores";
  import {
    combineImgPayloadAsURL,
    getToDoList,
    saveImageAndGetUrl,
    hideAction,
    revealImage,
    collectionTypeToggleIsPublic,
  } from "$lib/common";
  import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
  import { db } from "../../firebase";
  import { saveEditOfCollectionType } from "$lib/writeData";
  import { page } from "$app/stores";
  import ActionsContainer from "../General/actionsContainer.svelte";
  import IsPublicButton from "../General/buttons/isPublicButton.svelte";

  let card;
  let removeCollectionBtn;
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

    if (modal_galleryImageData.cardBanner.type) {
      container.find("button").removeAttr("disabled");
    }
  }
  // console.log("create card", { galleryImageData });
  function setData(jQuerySelection) {
    // console.log("setData", { galleryImageData });
    jQuerySelection.data("galleryImageData", galleryImageData);
    jQuerySelection.find(".collectionName").text(collectionName);
  }

  function deleteCollection() {
    const isConfirmOpen = jQuery(removeCollectionBtn).attr("aria-describedby");
    if (isConfirmOpen) {
      const container = jQuery(`#${modalId}`);
      const modal_galleryImageData = container.data("galleryImageData");
      console.log("deleteCollection", {});
      const indexOfLastSlash = modal_galleryImageData.path.lastIndexOf("/");
      const collection = modal_galleryImageData.path.slice(0, indexOfLastSlash);
      const id = modal_galleryImageData.path.slice(indexOfLastSlash);
      const collectionTypeDoc = doc(db, collection, id);
      deleteDoc(collectionTypeDoc);
    }
  }
</script>

<!-- {@debug galleryImageData} -->
<div>
  {#if $isLoggedIn}
    <div class="editBtn">
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
  {/if}
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

{#if $isLoggedIn}
  <div class=" position-absolute">
    <Modal id={modalId} showModal={false}>
      <span slot="headerText">
        <div class="d-flex">
          <span>
            Edit <span class="collectionName">{collectionName}</span> type
          </span>
          <span></span>
        </div>
      </span>
      <span slot="body">
        <CommonCollectionType {modalId} />
      </span>
      <span slot="footer">
        <button
          class="btn btn-primary"
          bind:this={removeCollectionBtn}
          on:click={deleteCollection}
          data-toggle="confirmation"
          data-title="Are you sure?"
          data-content="This might be dangerous. This will remove pictures."
          >Remove</button
        >
        <button
          class="btn btn-primary saveBtn"
          on:click={() =>
            saveEditOfCollectionType(modalId, "edit", $page.route.id, $tags)}
          >Save</button
        >
      </span>
    </Modal>
  </div>
{/if}

<style lang="scss">
  .editBtn {
    position: relative;
    z-index: 1;
  }
</style>
