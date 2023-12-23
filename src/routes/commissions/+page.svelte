<script>
  // @ts-nocheck

  import EditButton from "../../components/General/buttons/editButton.svelte";
  import Modal from "../../components/General/modal.svelte";
  // import { db as fake_db } from "../../fakeData";
  import { marked } from "marked";
  import { isLoggedIn, modal } from "../../stores";
  import { onMount } from "svelte";
  import { doc, onSnapshot, setDoc } from "firebase/firestore";
  import { db } from "../../firebase";
  import ImageSelection from "../../components/General/imageSelection.svelte";
  import ImageSelectionWithImageData from "../../components/General/imageSelectionWithImageData.svelte";
  import {
    getToDoList,
    saveImageAndGetUrl,
    combineImgPayloadAsURL,
    convertToGroupPayload,
    previewImage,
    revealImage,
  } from "$lib/common";
  import ImageSelectionGroupWithDescription from "../../components/General/imageSelectionGroupWithDescription.svelte";
  import ActionsContainer from "../../components/General/actionsContainer.svelte";

  const modalId = "editTextModalId";
  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";

  const commissionsDoc = doc(db, "textContent", "commissions");
  let commissionsData = {};
  onSnapshot(commissionsDoc, (doc) => {
    // console.log("Current data: ", doc.data());
    commissionsData = doc.data() || {};
  });

  onMount(() => {
    jQuery(`#${modalId}`).on("shown.bs.modal", populateForm);
    jQuery(`#${modalId}`).on("hidden.bs.modal", () => {
      // remove image selects
      jQuery(`#${modalId}`).find(".imagesContainer").empty();
    });
    return () => {
      jQuery(`#${modalId}`).modal("hide");
    };
  });

  function populateForm() {
    let modal = jQuery(`#${modalId}`);
    // console.log("populateForm", { bannerData, modal, urlsToSave });
    // console.log({ ' modal.find(".description").': modal.find(".description") });
    modal.find(".description").val(commissionsData?.description || "");
    // console.log("populateForm", { commissionsData });
    let copyData = jQuery.extend(true, {}, commissionsData);
    delete copyData?.description;
    // console.log("populateForm", { copyData });
    for (let group in copyData) {
      const groupData = copyData[group];
      const num = getGroupCount();
      new ImageSelectionGroupWithDescription({
        target: jQuery(".imagesContainer").get(0),
        props: {
          name: `group-${num}`,
          label: `Group ${num}`,
        },
      });

      // set modal group description
      const nestedSelection = jQuery(`.imageSection.group-${num}`).find(
        ".image-description-container .description"
      );
      nestedSelection.val(groupData.description);

      // set the images
      delete groupData.description;
      delete groupData.id;
      for (let imageName in groupData) {
        // console.log({ imageName });
        addImageToGroup(nestedSelection, imageName);
        //set preview image
        const url = groupData[imageName].url;
        // console.log({ imageName, url });
        jQuery(`.image-selection-field.${imageName} .imagePreview`).attr(
          "src",
          url
        );
      }
    }

    return; // scope functions below
    function addImageToGroup(domEl, imageName) {
      const modal = jQuery(domEl).closest(".modal");
      const group = jQuery(domEl).closest(".imageSection");

      const groupImages = jQuery(group).find(`input[type=file]`);
      const imageCount = groupImages.toArray().length;
      const inputGroup = group.find(".imageGroup");

      new ImageSelection({
        target: modal.find(inputGroup).get(0),
        props: {
          name: imageName,
          hideLabel: true,
        },
      });
      return imageName;
    }
    // for (let image in copyData) {
    //   handleAddImage({ showDescription: true });
    //   modal = jQuery(`#${modalId}`);
    //   // debugger;
    //   const imageData = copyData[image];
    //   const imagePreview = modal.find(`.imageSection.${image} .imagePreview`);
    //   // console.log("populateForm", { image, imageData, imagePreview });
    //   imagePreview.attr("src", imageData.url);
    //   console.log("set image preview src", { imagePreview });
    //   const selector = `.imageSection.${image} .description`;
    //   const descriptionElem = modal.find(selector);
    //   console.log({ descriptionElem, imageData, selector });
    //   descriptionElem.val(imageData.description);
    // }
  }
  async function saveCommissionsText(e) {
    // console.log("saveCommissionsText", {});
    const container = jQuery(e.target).closest(".modal");
    const saveBtn = container.find(".saveBtn");
    const oldBtnText = jQuery(saveBtn).html();
    jQuery(saveBtn).html(`<i class="fa fa-spin fa-spinner"></i>`);
    const description = container.find(".description").val();
    let payload = {
      description,
    };

    const toDoList = getToDoList(jQuery(`#${modalId}`)) || [];
    // console.log("saveCommissionsText", { toDoList });
    const files = await saveImageAndGetUrl(toDoList, modalId);
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

    // console.log("saveCommissionsText", { payload });
    // debugger;
    payload = jQuery.extend(true, commissionsData, payload);
    setDoc(commissionsDoc, payload, { merge: true }).then(() => {
      jQuery(`#${modalId}`).modal("hide");
      // // clear filesToSave
      container.find(".description").val("");
      jQuery(saveBtn).html(oldBtnText);
    });
  }

  function getGroupCount() {
    const currNumberImages = jQuery(".imagesContainer")
      .children()
      .toArray().length;
    const num = currNumberImages + 1;
    return num;
  }

  function handleAddImage(options = {}) {
    // console.log("handleAddImage", {});
    // const imageSection = jQuery(`<div class="imageSection"></div>`);
    const currNumberImages = jQuery(".imagesContainer")
      .children()
      .toArray().length;
    const num = getGroupCount();

    const modal = jQuery(`#${modalId}`);
    // const component = new ImageSelectionWithImageData({
    new ImageSelectionGroupWithDescription({
      target: jQuery(".imagesContainer").get(0),
      props: {
        name: `group-${num}`,
        label: `Group ${num}`,
      },
    });

    // console.log("handleAddImage", { options });
    if (options.showDescription) {
      const container = jQuery(`#${modalId}`).find(
        ".image-description-container"
      );
      // console.log({ container });

      container.removeAttr("style");
    }
  }

  function getImagesGroups(data) {
    const dataCopy = Object.assign({}, data);
    delete dataCopy.description;
    // console.log("getImagesGroups", { dataCopy, data });
    const entries = Object.entries(dataCopy);
    const payload = entries
      .map(([id, data]) => {
        // console.log("getImagesGroups", { id, data, entries });
        data.id = id;
        // debugger;
        return data;
      })
      .sort((data_a, data_b) => (data_a.id <= data_b.id ? -1 : 1));

    // console.trace("getImagesGroups");
    // console.log("getImagesGroups", { entries, payload });
    return payload;
  }

  function imagesFrom(imageGroup) {
    const dataCopy = jQuery.extend(true, {}, imageGroup);
    delete dataCopy.description;
    delete dataCopy.id;
    return Object.entries(dataCopy)
      .map(([id, data]) => {
        data.id = id;
        return data;
      })
      .sort((data_a, data_b) => (data_a.id <= data_b.id ? -1 : 1));
  }
  $: commissionsDescription = commissionsData.description || "";
  $: imageGroups = getImagesGroups(commissionsData);

  $: console.log({ imageGroups });
  let hideAction = {
    remove: true,
  };
</script>

<div class="container position-relative mt-5 commissions">
  <div class={ifLoggedInClass}>
    <ActionsContainer>
      <EditButton {modalId} />
    </ActionsContainer>
  </div>
  {@html marked(commissionsDescription)}
  <!-- display images and text -->
  {#each imageGroups as imageGroup, i (imageGroup.id)}
    <div class="group-container row {(i + 1) % 2 == 0 ? 'row-reverse' : ''}">
      <div class="mason-grid col-6">
        {#each imagesFrom(imageGroup) as image (image.id)}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
          <img
            class="image-description-pair preview-img conseal"
            src={image.url}
            meta-name={image.id}
            alt=""
            on:click={previewImage}
            on:load={revealImage}
          />
        {/each}
      </div>
      {#if imageGroup.description}
        <div class="image-description-pair description col-6">
          {imageGroup.description}
        </div>
      {/if}
    </div>
  {/each}
</div>

<div class={ifLoggedInClass}>
  <Modal id={modalId} showModal={false} classes="modal-lg">
    <span slot="headerText"> Edit Commissions Text</span>
    <span slot="body">
      <textarea
        class="w-100 form-control description"
        placeholder="Main Text Area"
      ></textarea>
      <button class="btn btn-secondary my-1 btn-sm" on:click={handleAddImage}
        >Add Image Group</button
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

  .image-description-pair {
    display: inline;
    &.description {
      display: block;
    }
  }

  .image-description-pair {
  }
  .row-reverse {
    flex-direction: row-reverse;
  }

  .group-container {
    margin: 100px 0px;
  }
  .mason-grid {
    column-count: 3;
    column-gap: 10px;
    img {
      width: 100%;
      margin-bottom: 10px;
    }
    /* display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: masonry; */
  }

  .preview-img {
    cursor: pointer;
  }
</style>
