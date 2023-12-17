<script>
  import { page } from "$app/stores";
  import EditButton from "../../../components/General/editButton.svelte";
  import Modal from "../../../components/General/modal.svelte";
  import GalleryCardModal from "../../../components/Modals/GalleryCardModal.svelte";
  import { originalPaintings, originals } from "../../../stores";

  const modalId = "editImageDetailsModal";

  const hideAction = {
    remove: true,
  };
  let thisPainting;

  $: {
    thisPainting = $originalPaintings[$page.params.slug];
    console.log({ thisPainting, $originalPaintings });
  }

  $: console.log({ $originals, $originalPaintings, $page });
</script>

{#if thisPainting}
  <div class="container position-relative">
    <div class="d-grid grid-container">
      <div class=" d-flex justify-content-center">
        <img src={thisPainting.url} alt="" />
      </div>
      <div class="content d-flex flex-column pt-2 pl-0">
        <h2>{thisPainting.title}</h2>
        <p>${thisPainting.cost}</p>
        <p>Status: Sold out or not</p>
        <div class="description-container">
          <p>
            {thisPainting.description}
          </p>
        </div>
        <button class="btn btn-primary align-self-baseline">Add to cart</button>
      </div>
    </div>
    <EditButton {hideAction} {modalId} />
  </div>

  <GalleryCardModal
    {modalId}
    collectionType={thisPainting.collectionType}
    slug={$page.params.slug}
  />
{/if}

<style>
  img {
    max-width: 100%;
    max-height: 61vh;
  }
  .description-container {
    height: 100%;
  }
  .container {
    margin: 75px 0px 200px;
  }
  .grid-container {
    grid-gap: 40px;
    grid-template-columns: 1fr 1fr;
    @media (max-width: 750px) {
      grid-template-columns: 1fr;
    }
  }
</style>
