<script>
  // @ts-nocheck

  import EditButton from "../../components/General/editButton.svelte";
  import Modal from "../../components/General/modal.svelte";
  // import { db as fake_db } from "../../fakeData";
  import { marked } from "marked";
  import { isLoggedIn } from "../../stores";
  import { onMount } from "svelte";
  import { doc, onSnapshot, setDoc } from "firebase/firestore";
  import { db } from "../../firebase";
  import ImageSelection from "../../components/General/imageSelection.svelte";
  import ImageSelectionWithImageData from "../../components/General/imageSelectionWithImageData.svelte";
  import {
    getToDoList,
    saveImageAndGetUrl,
    combineImgPayloadAsURL,
  } from "$lib/common";
  const commissionText = "test";
  //   console.log({ commissionText });

  const modalId = "editTextModalId";
  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";

  const commissionsDoc = doc(db, "textContent", "commissions");
  let commissionsData = {};
  onSnapshot(commissionsDoc, (doc) => {
    console.log("Current data: ", doc.data());
    commissionsData = doc.data();
  });

  onMount(() => {
    jQuery(`#${modalId}`).on("show.bs.modal", populateForm);
    jQuery(`#${modalId}`).on("hidden.bs.modal", () => {
      // remove image selects
      jQuery(`#${modalId}`).find(".imagesContainer").empty();
    });
    return () => {
      jQuery(`#${modalId}`).modal("hide");
    };
  });

  function populateForm() {
    const modal = jQuery(`#${modalId}`);
    // console.log("populateForm", { bannerData, modal, urlsToSave });
    // console.log({ ' modal.find(".description").': modal.find(".description") });
    modal.find(".description").val(commissionsData.description);
    const copyData = Object.assign({}, commissionsData);
    delete copyData.description;
    console.log("populateForm", { copyData });
    for (let image in copyData) {
      handleAddImage({ showDescription: true });
      const imageData = copyData[image];
      const imagePreview = modal.find(`.imageSection.${image} .imagePreview`);
      // console.log("populateForm", { image, imageData, imagePreview });
      imagePreview.attr("src", imageData.url);
      const description = modal.find(`.imageSection.${image} .description`);
      console.log({ description, imageData });
      description.val(imageData.description);
    }
  }
  async function saveCommissionsText(e) {
    console.log("saveCommissionsText", {});
    const container = jQuery(e.target).closest(".modal");
    const saveBtn = container.find(".saveBtn");
    const oldBtnText = jQuery(saveBtn).html();
    jQuery(saveBtn).html(`<i class="fa fa-spin fa-spinner"></i>`);
    const description = container.find(".description").val();
    const payload = {
      description,
    };

    const toDoList = getToDoList(jQuery(`#${modalId}`)) || [];
    console.log("saveCommissionsText", { toDoList });
    const files = await saveImageAndGetUrl(toDoList);
    combineImgPayloadAsURL(payload, files);

    toDoList.forEach((imageName) => {
      // get meta data
      const url = payload[imageName];
      const description = jQuery(`#${modalId}`)
        .find(`.imageSection.${imageName}`)
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

    console.log("saveCommissionsText", { payload });

    setDoc(commissionsDoc, payload, { merge: true }).then(() => {
      jQuery(`#${modalId}`).modal("hide");
      // // clear filesToSave
      container.find(".description").val("");
      jQuery(saveBtn).html(oldBtnText);
    });
  }

  function handleAddImage(options = {}) {
    console.log("handleAddImage", {});
    // const imageSection = jQuery(`<div class="imageSection"></div>`);
    const currNumberImages = jQuery(".imagesContainer")
      .children()
      .toArray().length;
    const num = currNumberImages + 1;

    const component = new ImageSelectionWithImageData({
      target: jQuery(".imagesContainer").get(0),
      props: {
        name: `image-${num}`,
        label: `Image ${num}`,
      },
    });

    console.log("handleAddImage", { options });
    if (options.showDescription) {
      const container = jQuery(`#${modalId}`).find(
        ".image-description-container"
      );
      console.log({ container });

      container.removeAttr("style");
    }
  }

  function getImages(data) {
    const dataCopy = Object.assign({}, data);
    delete dataCopy.description;
    return Object.entries(dataCopy).map(([id, data]) => {
      data.id = id;
      return data;
    });
  }

  $: commissionsDescription = commissionsData.description || "";
  $: images = getImages(commissionsData);

  $: console.log({ images });
</script>

<div class="container position-relative mt-5 commissions">
  <div class={ifLoggedInClass}>
    <EditButton {modalId} />
  </div>
  {@html marked(commissionsDescription)}
  <!-- display images and text -->
  {#each images as image (image.id)}
    <img src={image.url} alt="" />
    <div>{image.description}</div>
  {/each}
</div>

<div class={ifLoggedInClass}>
  <Modal id={modalId} showModal={true} classes="modal-lg">
    <span slot="headerText"> Edit Commissions Text</span>
    <span slot="body">
      <textarea
        class="w-100 form-control description"
        placeholder="Main Text Area"
      ></textarea>
      <button class="btn btn-secondary my-1 btn-sm" on:click={handleAddImage}
        >Add Image</button
      >
      <div class="imagesContainer">
        <!-- Dynamically input ImageSelectionWithImageData -->
      </div>
    </span>
    <span slot="footer">
      <button class="btn btn-primary saveBtn" on:click={saveCommissionsText}
        >Save</button
      >
    </span>
  </Modal>
</div>

<style lang="scss">
  .commissions {
    img {
      width: 200px;
    }
  }
</style>
