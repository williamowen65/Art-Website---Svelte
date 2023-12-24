<script>
  import Gallery from "../../components/Gallery/gallery.svelte";
  import CollectionCard from "../../components/Gallery/collectionCard.svelte";
  import TodoNote from "../../components/Dev/todoNote.svelte";
  import {
    collectionTypeToggleIsPublic,
    combineImgPayloadAsURL,
    getToDoList,
    getUid,
    mapId,
    orderAlphabetical,
    saveImageAndGetUrl,
  } from "$lib/common";
  import { isLoggedIn, modalIds, originals } from "../../stores";
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
    return () => {
      jQuery(`#${modalId}`).modal("hide");
    };
  });
</script>

<TodoNote {note} />
<div class="mt-5 container">
  <h2>Originals</h2>

  <!-- <TodoNote {note} /> -->
  {#each orderAlphabetical(mapId($originals), "id") as collectionData (collectionData.id)}
    {#if (collectionData.isPublic && !$isLoggedIn) || $isLoggedIn}
      <div class="galleryContainer" id={collectionData.cardBanner.type}>
        <span class="d-flex align-items-baseline">
          <h5 class="collectionName">
            <!-- {@debug collectionData} -->
            {collectionData.cardBanner.type}
          </h5>
          {#if $isLoggedIn}
            <AddButton {modalId} />
            <IsPublicButton
              isPublic={collectionData.isPublic}
              path={collectionData.path}
              toggleIsPublic={collectionTypeToggleIsPublic}
              dataSource={collectionData}
            />
          {/if}
        </span>
        <Gallery>
          <!-- {tag} -->

          <!-- {@debug collectionData} -->
          {#key $originals}
            {#each orderAlphabetical(mapId(collectionData.paintings), "title") as painting (painting.id)}
              <!-- {@debug painting} -->
              {#if (painting.isPublic && !$isLoggedIn) || $isLoggedIn}
                <GalleryCard
                  type="galleryImage"
                  galleryImageData={painting}
                  collectionName={collectionData.id}
                />
              {/if}
            {/each}
          {/key}
        </Gallery>
      </div>
    {/if}
  {/each}
</div>

<!-- Move the edit modal here too -->
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

<!-- thisPainting={galleryImageData} -->

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
