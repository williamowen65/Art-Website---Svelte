<script>
  // @ts-nocheck

  import {
    getUrls,
    mapId,
    orderAlphabetical,
    readLocalFile,
    saveImageAndGetUrl,
  } from "$lib/common";
  import { addDoc, collection, doc, setDoc } from "firebase/firestore";
  import { images, modalIds } from "../../stores";
  import Modal from "../General/modal.svelte";
  import { db } from "../../firebase";
  import { onMount } from "svelte";
  import ActionsContainer from "../General/actionsContainer.svelte";
  import EditButton from "../General/buttons/editButton.svelte";
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  const { imageBucketModalId } = modalIds;
  let fileInput, imagePreviewElem, imgPreviewContainer, saveBtn;
  let imageUploadPreviewModal = "imageUploadPreviewModal";

  onMount(() => {
    // new Dropzone({
    //   target: jQuery(`#${imageBucketModalId} #dropzone`),
    // });
    jQuery(`#${imageUploadPreviewModal}`).on("hidden.bs.modal", clearForm);
    return () => {};
  });

  function clearForm() {
    jQuery(fileInput).closest("form").get(0).reset();
    jQuery("#imageName").val("");
    jQuery(saveBtn).removeAttr("data-id");
  }

  function openFilePicker() {
    jQuery(fileInput).click();
  }
  function updateImagePreview(e) {
    // console.log("updateImagePreview", {});
    readLocalFile(e).then(({ theseFiles }) => {
      let url = Object.values(theseFiles)[0].url;
      let imageName = Object.values(theseFiles)[0].theFile.name;
      console.log({ url, theseFiles });
      const modal = jQuery(`#${imageUploadPreviewModal}`);
      const header = modal.find('span[slot="headerText"]');
      const headerAddText = header.attr("data-add-text");
      header.text(headerAddText);
      jQuery("#imageUploadPreviewModal").modal("show");
      jQuery(imagePreviewElem).attr("src", url);
      jQuery("#imageName").val(imageName);
      jQuery(imgPreviewContainer).show();
    });
  }

  async function directlyAddFile(e) {
    const { acceptedFiles, fileRejections } = e.detail;

    const files = await getUrls(
      acceptedFiles.reduce((curr, prev) => {
        curr[prev.name] = prev;
        return curr;
      }, {})
    );
    const file = Object.values(files)[0];

    console.log("addImage", { acceptedFiles, files, file });

    const url = file?.url;
    const imageName = file?.file.name;

    const payload = {};
    if (url) payload.url = url;
    if (imageName) payload.imageName = imageName;

    const imageDoc = collection(db, "images");
    addDoc(imageDoc, payload).then(() => {
      jQuery("#imageUploadPreviewModal").modal("hide");
    });
  }
  async function addImageToBucket(e) {
    const files = await saveImageAndGetUrl(
      ["newImage"],
      imageUploadPreviewModal
    );
    const url = files.newImage?.url;
    const imageName = jQuery("#imageName").val();

    // if (!url || !imageName) {
    //   alert("url or image name missing");
    // }

    const payload = {};
    if (url) payload.url = url;
    if (imageName) payload.imageName = imageName;

    console.log("addImageToBucket", { payload });

    //check for id
    const firestoreId =
      jQuery(e.target).attr("data-id") || collection(db, "randomCol").id;

    const imageDoc = doc(db, "images", firestoreId);
    setDoc(imageDoc, payload, { merge: true }).then(() => {
      jQuery("#imageUploadPreviewModal").modal("hide");
    });
  }

  function setData(modal, e) {
    console.log({ "e.target": e.target });
    const header = modal.find('span[slot="headerText"]');
    const headerEditText = header.attr("data-edit-text");
    header.text(headerEditText);
    const imageContainer = jQuery(e.target).closest(".imageContainer");
    const imageId = imageContainer.attr("id");
    const imageData = $images[imageId];
    modal.find("img").attr("src", imageData.url);
    modal.find("#imageName").val(imageData.imageName);
    modal.find(saveBtn).attr("data-id", imageId);
  }
</script>

<Modal showModal={true} id={imageBucketModalId} classes="imageBucket">
  <span slot="headerText"><h5>Image Bucket</h5></span>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <span slot="body">
    <Dropzone
      containerClasses="d-flex flex-wrap w-100 flex-row"
      accept="image/*"
      noClick={true}
      on:drop={directlyAddFile}
    >
      {#each orderAlphabetical(mapId($images)) as image (image.id)}
        <div class="position-relative imageContainer" id={image.id}>
          <img src={image.url} alt="" />
          <div>{image.imageName}</div>
          <ActionsContainer>
            <EditButton modalId={imageUploadPreviewModal} {setData} />
          </ActionsContainer>
          <!-- <i class="fa fa-pencil bg-light editImage"></i> -->
        </div>
      {/each}
    </Dropzone>
  </span>
  <span slot="footer" class="d-flex justify-content-between">
    <div class="ml-auto d-flex align-items-end">
      <button class="btn btn-secondary mr-1" on:click={openFilePicker}
        >Add Image</button
      >
      <button class="btn btn-primary">Select Images</button>
    </div>
  </span>
</Modal>

<Modal id="imageUploadPreviewModal" showModal={false} classes="modal-sm">
  <span
    slot="headerText"
    data-add-text="Add Image To Bucket"
    data-edit-text="Edit Image Name"
  ></span>
  <span slot="body">
    <div
      class="d-flex flex-column imgPreviewContainer align-items-center"
      bind:this={imgPreviewContainer}
    >
      <img
        src="https://placehold.co/600x600/png?text=Placeholder"
        alt=""
        bind:this={imagePreviewElem}
      />
      <input
        type="text"
        id="imageName"
        placeholder="Image Name"
        class="form-control"
      />
      <form>
        <input
          type="file"
          name="newImage"
          class="d-none"
          bind:this={fileInput}
          on:change={updateImagePreview}
        />
      </form>
    </div>
  </span>
  <span slot="footer">
    <button
      class="btn btn-primary"
      on:click={addImageToBucket}
      bind:this={saveBtn}>Save Image</button
    >
  </span>
</Modal>

<style lang="scss">
  :global(.dropzone) {
    height: fit-content !important;
    min-height: 400px;
  }
  :global(.imageBucket) {
    max-width: 100%;
    margin-left: 12px;
    min-height: 0;

    :global(.modal-content) {
      height: 90vh;
    }
    :global(.modal-body) {
      height: 66vh;
      overflow-y: scroll;
    }
    :global(.modal-footer) {
      display: block;
    }
  }
  :global(.imgPreviewContainer) {
    :global(img) {
      margin-right: 0 !important;
    }
    :global(input) {
      width: 200px;
    }
  }
  .editImage {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
