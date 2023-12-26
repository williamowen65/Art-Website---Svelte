<script>
  // @ts-nocheck

  import EditButton from "../General/buttons/editButton.svelte";
  import Modal from "../General/modal.svelte";
  import { onMount } from "svelte";
  import { filesToSave, isLoggedIn, bannerData, modalIds } from "../../stores";
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
  const showModal = false;
  let saveBtn;
  let imageSelectionContainer;

  // const docData = doc.data();

  console.log({ modalId, modalIds });
  onMount(() => {
    if (showModal) {
      jQuery(`#${modalId}`).modal("show");
    }
    jQuery(`#${modalId}`).on("show.bs.modal", populateForm);
    return () => {
      // Mostly for dev editing of component
      jQuery(`#${modalId}`).modal("hide");
    };
  });

  let urlsToSave = [];

  async function updateBannerData(e) {
    // console.log("updateBannerData", { urlsToSave });
    const container = jQuery(e.target).closest(".modal");
    const oldBtnText = jQuery(saveBtn).html();
    jQuery(saveBtn).html(`<i class="fa fa-spin fa-spinner"></i>`);

    // save banner document in db
    const description = container.find(".description").val();
    const showDescription = container.find(".showDescription").prop("checked");

    const payload = {
      description,
      showDescription,
    };

    const toDoList = getToDoList(jQuery(`#${modalId}`)) || [];
    const files = await saveImageAndGetUrl(toDoList, modalId);
    combineImgPayloadAsURL(payload, files);
    console.log({ payload });
    // debugger;
    for (let imageName of toDoList) {
      const url = payload[imageName];
      payload.imgUrl = url;
      delete payload[imageName];
    }
    const bannerDoc = doc(db, "textContent", "banner");

    setDoc(bannerDoc, payload).then(() => {
      jQuery(`#${modalId}`).modal("hide");
      // clear filesToSave
      container.find(".description").val("");
      container.find(".showDescription").removeProp("checked");
      jQuery(saveBtn).html(oldBtnText);
      filesToSave.update(() => ({}));
      urlsToSave = [];
    });
    // });
  }

  function populateForm() {
    const modal = jQuery(`#${modalId}`);
    // console.log("populateForm", { $bannerData, modal, urlsToSave });
    modal.find(".description").val($bannerData.description);
    modal.find(".imagePreview").attr("src", $bannerData.imgUrl);
    const checkbox = modal.find(".showDescription");
    // console.log({ checkbox });
    if ($bannerData.showDescription) {
      checkbox.prop("checked", true);
    } else {
      checkbox.removeProp("checked");
    }
    if ($bannerData.imgUrl) {
      urlsToSave.push($bannerData.imgUrl);
    }
  }

  /**
   * DOM UPDATES
   */
  $: bannerStyles = $bannerData?.imgUrl
    ? `background-image: url(${$bannerData?.imgUrl})`
    : "";
  $: bannerClass = $bannerData?.imgUrl ? `show` : "";

  $: bannerDescription = $bannerData.description || "";
  $: bannerShowDescription = $bannerData.showDescription ? "" : "d-none";

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
          <img src="${image.url}"/>
          <span>${image.imageName}</span>
        </div>
      `);
    });
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
  {#if $isLoggedIn}
    <ActionsContainer>
      <EditButton contentType="banner" {modalId} />
    </ActionsContainer>
    <Modal id={modalId} classes={modalClasses} showModal={true}>
      <span slot="headerText" class="w-100">
        <div class="d-flex justify-content-between align-items-baseline w-100">
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
            class="btn btn-secondary"
            on:click={() =>
              openImageBucket({
                limit: 1,
                onImageSelection,
              })}>Select Image From Bucket</button
          >
          <div bind:this={imageSelectionContainer}></div>
        </div>
        <!-- <ImageSelection name="bannerPic" label="Banner Pic" {hideAction} /> -->
        <div class="field">
          <label for="">Description</label>
          <textarea
            class="form-control description"
            rows="5"
            bind:value={$bannerData.description}
          ></textarea>
        </div>
        <div class="field">
          <div class="d-flex">
            <label for="" class="mr-3">Show Description</label>
            <input
              type="checkbox"
              class="showDescription"
              bind:checked={$bannerData.showDescription}
            />
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
</div>

<style lang="scss">
  .banner {
    position: relative;
    height: 80vh;
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
