<script>
  import Banner from "../components/Sections/banner.svelte";
  import Gallery from "../components/Gallery/gallery.svelte";
  import CollectionCard from "../components/Gallery/collectionCard.svelte";
  import AddButton from "../components/General/buttons/addButton.svelte";
  import Modal from "../components/General/modal.svelte";
  import CommonCollectionType from "../components/Modals/common/commonCollectionType.svelte";
  import ClassesProxy from "./classes/classesProxy.svelte";
  import AddClassModal from "./classes/addClassModal.svelte";
  import {
    isLoggedIn,
    originals,
    tags,
    collectionsData,
    collectionDocData,
    modalIds,
  } from "../stores";
  import {
    combineImgPayloadAsURL,
    conditionallySaveType,
    convertToGroupPayload,
    getToDoList,
    mapId,
    orderByProp,
    saveImageAndGetUrl,
  } from "$lib/common";
  import { onMount } from "svelte";
  import {
    addDoc,
    collection,
    doc,
    getDoc,
    onSnapshot,
    setDoc,
  } from "firebase/firestore";
  import { db } from "../firebase";
  import { ref } from "firebase/storage";
  import IsPublicButton from "../components/General/buttons/isPublicButton.svelte";

  const { createCollectionModalId: modalId } = modalIds;

  onMount(() => {
    /**
     * NOTE this modal component is called for the edit workflow via the individual cards
     * as well as the create button
     */
    jQuery(`#${modalId}`).on("hidden.bs.modal", () => {
      // remove image file ImageSelection
      // reset preview image
      // clear description
      // console.log("clearing modal inputs");
      jQuery(`#${modalId} form`).get(0).reset();
      const previewImgDefault = jQuery(`#${modalId}`)
        .find(".imagePreview")
        .attr("data-previewImgDefault");
      jQuery(`#${modalId}`)
        .find(".imagePreview")
        .attr("src", previewImgDefault);
      jQuery(`select`).val(null).trigger("change");
    });
    return () => {};
  });

  async function createCollectionType() {
    const container = jQuery(`#${modalId}`);
    const saveBtn = container.find(".saveBtn");
    const oldBtnText = saveBtn.html();
    jQuery(saveBtn).html(`<i class="fa fa-spin fa-spinner"></i>`);
    const description = container.find(".description").val();
    const isPublic = container.find("input[name=public]").prop("checked");
    const type = container.find("select").select2("data")[0]?.id;

    conditionallySaveType(type, $tags);

    let payload = {
      isPublic,
    };
    // console.log({ payload });

    const toDoList = getToDoList(jQuery(`#${modalId}`)) || [];

    /**
     * I am having trouble save this because, saveImageAndGetUrl has bug wit this modal
     */

    // console.log("createCollectionType", { toDoList });
    const files = await saveImageAndGetUrl(toDoList, modalId);
    // console.log({ files });
    // debugger;

    combineImgPayloadAsURL(payload, files);

    for (let imageName of toDoList) {
      // get meta data
      // console.log({ imageName });
      const url = payload[imageName];

      payload[imageName] = {
        description: description || "",
        type,
      };

      if (!type || !url) {
        jQuery(saveBtn).html(oldBtnText);
        return console.log("Save missing data", { type, url });
        alert("Missing img, description, or type");
      }

      if (url) {
        jQuery.extend(true, payload, {
          [imageName]: {
            url,
          },
        });
      }
    }

    const collectionName = container.find(".collectionName").text();

    // adding the data
    // console.log("createCollectionType", { payload, files });
    const collectionRef = doc(
      db,
      `paintings/collections/${collectionName}`,
      type
    );
    // console.log({ collectionName });
    setDoc(collectionRef, payload, { merge: true }).then(() => {
      jQuery(`#${modalId}`).modal("hide");
      // clear filesToSave
      container.find(".description").val("");
      jQuery(saveBtn).html(oldBtnText);
      // urlsToSave = [];
    });
  }

  function sortByIndex(collectionDocData) {
    const sorted = Object.entries(collectionDocData)
      .sort(([collection_a, data_a], [collection_b, data_b]) => {
        // console.log({ data_a, data_b });
        return data_a.index <= data_b.index ? -1 : 1;
      })
      .map(([key]) => key);
    // console.log("sortByIndex", { sorted });
    return sorted;
  }

  // console.log({ collectionss });
  $: console.log({ $collectionsData });
</script>

<Banner />
<div class="container" data-component="home page">
  <!-- collections are firestone documents from the paintingsCollection: originals and reproductions  -->
  {#each sortByIndex($collectionDocData) as title, index (title)}
    <div class="galleryContainer">
      <span class="d-flex">
        <h2 class="collectionName">{title}</h2>
        {#if $isLoggedIn}
          <AddButton {modalId} />
        {/if}
      </span>
      {#key $originals}
        {#key $collectionsData}
          <Gallery>
            {#each orderByProp(mapId($collectionsData[title]), "id") as galleryImageData, index (galleryImageData.id)}
              {#if (galleryImageData.isPublic && !$isLoggedIn) || $isLoggedIn}
                <div>
                  <!-- {@debug title} -->
                  <CollectionCard
                    type="collectionCard"
                    {galleryImageData}
                    collectionName={title}
                  />
                </div>
              {/if}
            {/each}
          </Gallery>
        {/key}
      {/key}
    </div>
  {/each}

  <div class="classes">
    <ClassesProxy />
  </div>
</div>

{#if $isLoggedIn}
  <!-- TODO move create and edit modal to same file, like classes modals -->
  <Modal id={modalId} showModal={false} data-collection-type>
    <span slot="headerText"
      >Create <span class="collectionName"></span> type</span
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
{/if}

<style>
  .galleryContainer {
    margin: 100px 0px;
  }
</style>
