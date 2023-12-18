<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import EditButton from "../../../components/General/editButton.svelte";
  import Modal from "../../../components/General/modal.svelte";
  import GalleryCardModal from "../../../components/Modals/GalleryCardModal.svelte";
  import {
    originalPaintings,
    originals,
    reproductionPaintings,
    reproductions,
    thisPainting,
  } from "../../../stores";

  const modalId = "editImageDetailsModal";

  const hideAction = {
    remove: true,
  };

  onMount(() => {
    jQuery(`#${modalId}`).on("show.bs.modal", populateForm);
    return () => {
      jQuery(`#${modalId}`).modal("hide");
    };
  });

  function populateForm(e) {
    const container = jQuery(`#${modalId}`);
    console.log({ " populateFormcontainer.data()": container.data() });

    // container.find(".collectionName").text(collectionName);
    container.find(".imagePreview").attr("src", $thisPainting.url);
    container.find(".description").val($thisPainting.description);
    container.find(".title").val($thisPainting.title);
    container.find(".cost").val($thisPainting.cost);
  }

  // $: {
  //   // thisPainting = $reproductionPaintings[$page.params.slug];
  //   thisPainting.update(() => $originalPaintings[$page.params.slug]);
  //   console.log({ $thisPainting, $reproductionPaintings });
  // }

  $: console.log("about to render", {
    $originals,
    $reproductions,
    $page,
    $thisPainting,
  });
</script>

{#key $thisPainting}
  {#if $thisPainting}
    <div class="container position-relative">
      <div class="d-grid grid-container">
        <div class=" d-flex justify-content-center">
          <img src={$thisPainting.url} alt="" />
        </div>
        <div class="content d-flex flex-column pt-2 pl-0">
          <h2>{$thisPainting.title}</h2>
          <p>${$thisPainting.cost}</p>
          <p>Status: Sold out or not</p>
          <div class="description-container">
            <p>
              {$thisPainting.description}
            </p>
          </div>
          <button class="btn btn-primary align-self-baseline"
            >Add to cart</button
          >
        </div>
      </div>
      <EditButton {hideAction} {modalId} />
    </div>

    <!-- {@debug $thisPainting} -->
    <GalleryCardModal
      {modalId}
      collectionType={$thisPainting.collectionType}
      slug={$page.params.slug}
      thisPainting={$thisPainting}
    />
  {/if}
{/key}

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
