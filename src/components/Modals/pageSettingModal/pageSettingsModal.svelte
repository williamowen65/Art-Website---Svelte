<script>
  import { onMount } from "svelte";
  import { modalIds } from "../../../stores";
  import Modal from "../../General/modal.svelte";
  import PagesPane from "./common/pagesPane.svelte";
  import Banner from "./sections/banner.svelte";
  import GalleryGrid from "./sections/galleryGrid.svelte";
  import FreeformBlock from "./sections/freeformBlock.svelte";
  import ImageTextBlocks from "./sections/imageTextBlocks.svelte";
  import Newsletter from "./sections/newsletter.svelte";
  import Classes from "./sections/classes.svelte";
  // import dragula from "dragula";

  const { pageSettingsModal } = modalIds;
</script>

<Modal
  showModal={true}
  id={pageSettingsModal}
  classes="fullScreenModal pageSettings"
>
  <span slot="headerText">Website Settings</span>
  <span slot="body" class="d-grid mt-0" style="grid-template-columns: 1fr 1fr;">
    <PagesPane />
    <div>
      <h3>Sections</h3>
      <small>All section can open related modals seen elsewhere</small>
      <!-- Draggable content -->

      <ul class="list-group" id="sections">
        <Banner />
        <GalleryGrid />
        <FreeformBlock />
        <ImageTextBlocks />
        <Newsletter />
        <Classes />
      </ul>
    </div>
  </span>
  <span
    slot="footer"
    class="d-flex align-items-baseline justify-content-between"
  >
    <!-- <p>stats</p> -->
    <!-- <button class="btn btn-primary">save</button> -->
  </span>
</Modal>

<style lang="scss">
  :global(.pageSettings .modal-body) {
    padding-top: 0;
  }
  h3 {
    height: 37px;
  }

  :global(#sections .list-group-item) {
    display: flex;
    span {
      display: inline-block;
      margin-right: auto;
    }
  }
</style>
