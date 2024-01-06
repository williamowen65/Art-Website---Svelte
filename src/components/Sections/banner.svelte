<script>
  // @ts-nocheck

  import EditButton from "../General/buttons/editButton.svelte";
  import Modal from "../General/modal.svelte";
  import { afterUpdate, onMount } from "svelte";
  import {
    filesToSave,
    isLoggedIn,
    bannerData,
    modalIds,
    images,
  } from "../../stores";
  import ThisDropzone from "../General/dropzone/thisDropzone.svelte";
  import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
  import { db, storage } from "../../firebase";
  import {
    combineImgPayloadAsURL,
    getToDoList,
    getUid,
    hideAction,
    openImageBucket,
    saveImageAndGetUrl,
  } from "$lib/common";
  import {
    collection,
    doc,
    getDoc,
    onSnapshot,
    setDoc,
  } from "firebase/firestore";
  import { marked } from "marked";
  import ActionsContainer from "../General/actionsContainer.svelte";
  import ImageSelection from "../General/imageSelection.svelte";

  const { bannerModalId: modalId } = modalIds;
  let saveBtn;
  let imageSelectionContainer;

  async function updateBannerData(e) {
    const container = jQuery(e.target).closest(".modal");
    const oldBtnText = jQuery(saveBtn).html();
    jQuery(saveBtn).html(`<i class="fa fa-spin fa-spinner"></i>`);

    // save banner document in db
    const description = container.find(".description").val();
    const showDescription = container.find(".showDescription").prop("checked");
    const imgId = container.find("img").attr("id");

    const payload = {
      description,
      showDescription,
      ...(imgId && { imgId }),
    };

    const bannerDoc = doc(db, "textContent", "banner");

    setDoc(bannerDoc, payload).then(() => {
      jQuery(`#${modalId}`).modal("hide");
      // clear filesToSave
      container.find(".description").val("");
      container.find(".showDescription").removeProp("checked");
      jQuery(saveBtn).html(oldBtnText);
      filesToSave.update(() => ({}));
    });
  }

  function clearForm() {
    const container = jQuery(`#${modalId}`);
    container.find(".description").val("");
    container.find(".showDescription").removeProp("checked");
    container.find(imageSelectionContainer).empty();
  }
  function populateForm() {
    const modal = jQuery(`#${modalId}`);
    console.log("populateForm/banner", { modal, $bannerData });
    modal.find(".description").val($bannerData.description);
    if ($bannerData.imgId) {
      const image = $images[$bannerData.imgId];
      jQuery(imageSelectionContainer).append(`
      <div>
          <img src="${$bannerData.url}" id="${$bannerData.id}"u/>
          <span>${$bannerData.imageName}</span>
        </div>
      `);
    }
    // modal.find(".imagePreview").attr("src", $bannerData.url);
    const checkbox = modal.find(".showDescription");
    // // console.log({ checkbox });
    if ($bannerData.showDescription) {
      checkbox.prop("checked", true);
    } else {
      checkbox.removeProp("checked");
    }
  }

  /**
   * DOM UPDATES
   */
  $: bannerStyles = $bannerData?.url
    ? `background-image: url(${$bannerData?.url})`
    : "";
  $: bannerClass = $bannerData?.url ? `show` : "";

  $: bannerDescription = $bannerData.description || "";
  $: bannerShowDescription = $bannerData.showDescription ? "" : "d-none";

  // $: if ($bannerData.url) {
  //   // populateForm();
  // }

  let modalClasses = "";
  function toggleModalClasses() {
    // console.log("toggleModalClasses", { modalClasses });
    const icon = jQuery(".moveModal");
    if (modalClasses) {
      modalClasses = "";
      icon.addClass("fa-arrow-circle-left");
      icon.removeClass("fa-arrow-circle-right");
    } else {
      icon.removeClass("fa-arrow-circle-left");
      icon.addClass("fa-arrow-circle-right");
      modalClasses = "ml-0 w-25";
    }
    // console.log("toggleModalClasses", { modalClasses });
  }

  // add images to initial modal
  function onImageSelection(selection) {
    console.log("onImageSelection", { selection });
    jQuery(imageSelectionContainer).empty();
    selection.forEach((image) => {
      jQuery(imageSelectionContainer).append(`
      <div>
          <img src="${image.url}" id="${image.id}"u/>
          <span>${image.imageName}</span>
        </div>
      `);
    });
  }

  function onOpen() {
    const { imageBucketModalId } = modalIds;
    // select selected images
    if ($bannerData.imgId) {
      console.log("onOpen", {});
      jQuery(`#${imageBucketModalId}`)
        .find("#" + $bannerData.imgId)
        .find("input[type=checkbox]")
        .click();
    }
  }
</script>

<div
  class="jumbotron banner rounded-0 {bannerClass}"
  style={bannerStyles}
  data-component="banner"
>
  <div class={bannerShowDescription}>
    <div class="bannerDescription background"></div>
    <div class="bannerDescription content">
      {@html marked(bannerDescription)}
    </div>
  </div>
  {#key $bannerData}
    {#if $isLoggedIn}
      <ActionsContainer>
        <EditButton contentType="banner" {modalId} {populateForm} />
      </ActionsContainer>
      <Modal
        id={modalId}
        classes={modalClasses}
        showModal={false}
        {populateForm}
        {clearForm}
      >
        <span slot="headerText" class="w-100">
          <div
            class="d-flex justify-content-between align-items-baseline w-100"
          >
            <span>Edit Banner</span>
            <i
              class="fa fa-arrow-circle-left moveModal"
              on:click={toggleModalClasses}
            ></i>
          </div>
        </span>
        <span slot="body">
          <div>
            <button
              class="btn btn-secondary mb-1"
              on:click={() =>
                openImageBucket({
                  limit: 1,
                  onImageSelection,
                  onOpen,
                })}>Select Image From Bucket</button
            >
            <div bind:this={imageSelectionContainer}></div>
          </div>
          <!-- <ImageSelection name="bannerPic" label="Banner Pic" {hideAction} /> -->
          <div class="field">
            <label for="">Description</label>
            <textarea class="form-control description" rows="5"></textarea>
          </div>
          <div class="field">
            <div class="d-flex">
              <label for="" class="mr-3">Show Description</label>
              <input type="checkbox" class="showDescription" />
            </div>
          </div>
        </span>
        <span slot="footer">
          <button
            class="btn btn-primary"
            on:click={updateBannerData}
            bind:this={saveBtn}>Save</button
          >
        </span>
      </Modal>
    {/if}
  {/key}
</div>

<style lang="scss">
  .banner {
    position: relative;
    height: 80vh;
    background-position: center;
    background-size: cover;
    animation: fadeIn 0.3s ease 0 forwards;
    opacity: 0;
    transition: opacity 0.3s;
    &.show {
      opacity: 1;
    }
    .bannerDescription {
      background: white;
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      /* padding: 50px; */
      height: 60%;
      width: 50%;
      &.content {
        height: 43%;
        width: 40%;
        padding: 10px 20px;
      }
      &.background {
        opacity: 0.5;
        height: 60%;
        width: 50%;
      }
    }
  }
  .moveModal {
    cursor: pointer;
  }
</style>
