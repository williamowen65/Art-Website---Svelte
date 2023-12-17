<script>
  import Gallery from "../../components/Gallery/gallery.svelte";
  import CollectionCard from "../../components/Gallery/collectionCard.svelte";
  import TodoNote from "../../components/Dev/todoNote.svelte";
  import {
    combineImgPayloadAsURL,
    getToDoList,
    getUid,
    mapId,
    saveImageAndGetUrl,
  } from "$lib/common";
  import { isLoggedIn, originals } from "../../stores";
  import AddButton from "../../components/General/addButton.svelte";
  import Modal from "../../components/General/modal.svelte";
  import ImageSelection from "../../components/General/imageSelection.svelte";
  import { addDoc, doc, setDoc } from "firebase/firestore";
  import { db } from "../../firebase";
  import { onMount } from "svelte";
  import GalleryCard from "../../components/Gallery/galleryCard.svelte";
  import CommonPaintingModalBody from "../../components/Modals/commonPaintingModalBody.svelte";
  import { addPainting } from "$lib/writeData";

  const note = `
- Create common modal for Collection and gallery modal components.
- use a common file for the ID
`;
  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";
  let modalId = "modalAddPainting";
  let hideAction = {
    remove: true,
  };

  onMount(() => {
    console.log({ $originals });
    // jQuery(`#${modalId}`).on("show.bs.modal", populateForm);
    return () => {};
  });

  function populateForm() {
    console.log("populateForm", {});
  }
</script>

<TodoNote {note} />
<div class="mt-5 container">
  <h2>Originals</h2>

  <!-- <TodoNote {note} /> -->
  <!-- {@debug $originals} -->
  {#each mapId($originals) as collectionData}
    <div class="galleryContainer">
      <span class="d-flex align-items-baseline">
        <h5 class="collectionName">{collectionData.cardBanner.type}</h5>
        <div class={ifLoggedInClass}>
          <AddButton {modalId} />
        </div>
      </span>
      <Gallery>
        <!-- {tag} -->

        <!-- {@debug collectionData} -->
        {#each mapId(collectionData.paintings) as painting (painting.id)}
          <GalleryCard
            type="galleryImage"
            galleryImageData={painting}
            collectionName={collectionData.id}
          />
          <!-- {@debug painting} -->
        {/each}
      </Gallery>
    </div>
  {/each}
</div>

<Modal id={modalId} showModal={false}>
  <span slot="headerText">
    <h5>Add Painting to <span class="collectionName"></span></h5>
  </span>
  <span slot="body">
    <CommonPaintingModalBody />
  </span>
  <span slot="footer">
    <button
      class="btn btn-primary saveBtn"
      on:click={() => addPainting(modalId)}>Save</button
    >
  </span>
</Modal>

<style>
  .description-field {
    height: 100%;
  }
  .description {
    height: 100%;
  }
</style>
