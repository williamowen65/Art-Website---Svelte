<script>
  import Gallery from "../../components/Gallery/gallery.svelte";
  import CollectionCard from "../../components/Gallery/collectionCard.svelte";
  import TodoNote from "../../components/Dev/todoNote.svelte";
  import {
    combineImgPayloadAsURL,
    getToDoList,
    getUid,
    mapId,
    orderAlphabetical,
    saveImageAndGetUrl,
  } from "$lib/common";
  import { isLoggedIn, modalIds, originals, reproductions } from "../../stores";
  import AddButton from "../../components/General/buttons/addButton.svelte";
  import Modal from "../../components/General/modal.svelte";

  import { onMount } from "svelte";
  import GalleryCard from "../../components/Gallery/galleryCard.svelte";
  import CommonPaintingModalBody from "../../components/Modals/commonPaintingModalBody.svelte";
  import { addPainting } from "$lib/writeData";
  import { page } from "$app/stores";
  import IsPublicButton from "../../components/General/buttons/isPublicButton.svelte";
  import GalleryCardModal from "../../components/Modals/GalleryCardModal.svelte";

  const note = `
- Create common modal for Collection and gallery modal components.
- use a common file for the ID
`;
  const { addPaintingModalId: modalId, editGalleryCardModalId } = modalIds;
  let hideAction = {
    remove: true,
  };

  onMount(() => {
    console.log({ $reproductions });
    // jQuery(`#${modalId}`).on("show.bs.modal", populateForm);
    return () => {
      jQuery(`#${modalId}`).modal("hide");
    };
  });
</script>

<TodoNote {note} />
<div class="mt-5 container">
  <h2>Reproductions</h2>

  <!-- <TodoNote {note} /> -->
  <!-- {@debug $originals} -->
  {#each mapId($reproductions) as collectionData}
    {#if (collectionData.isPublic && !$isLoggedIn) || $isLoggedIn}
      <div class="galleryContainer" id={collectionData.cardBanner.type}>
        <span class="d-flex align-items-baseline">
          <h5 class="collectionName">
            {collectionData.cardBanner.type}
          </h5>
          {#if $isLoggedIn}
            <AddButton {modalId} />
            <IsPublicButton
              isPublic={collectionData.isPublic}
              path={collectionData.path}
            />
          {/if}
        </span>
        <Gallery>
          <!-- {tag} -->

          <!-- {@debug collectionData} -->
          {#key $reproductions}
            {#each orderAlphabetical(mapId(collectionData.paintings), "title") as painting (painting.id)}
              {#if (painting.isPublic && !$isLoggedIn) || $isLoggedIn}
                <GalleryCard
                  type="galleryImage"
                  galleryImageData={painting}
                  collectionName={collectionData.id}
                />
              {/if}
              <!-- {@debug painting} -->
            {/each}
          {/key}
        </Gallery>
      </div>
    {/if}
  {/each}
</div>

<Modal id={modalId} showModal={false}>
  <span slot="headerText">
    <h5>
      Add Painting to {$page.route.id?.slice(1)}/<span class="collectionName"
      ></span>
    </h5>
  </span>
  <span slot="body">
    <CommonPaintingModalBody />
  </span>
  <span slot="footer">
    <button
      class="btn btn-primary saveBtn"
      on:click={() => addPainting(modalId, "create", $page)}>Save</button
    >
  </span>
</Modal>

<GalleryCardModal
  modalId={editGalleryCardModalId}
  collectionType={$page.route.id?.slice(1)}
/>

<style>
  .description-field {
    height: 100%;
  }
  .description {
    height: 100%;
  }
  .galleryContainer {
    padding-top: 107px;
  }
</style>
