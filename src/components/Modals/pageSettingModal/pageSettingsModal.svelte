<script>
  import { onMount } from "svelte";
  import { modalIds } from "../../../stores";
  import Modal from "../../General/modal.svelte";
  import PagesPane from "./common/pagesPane.svelte";
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
        <li class="list-group-item" data-section-type="Banner">
          <span>Banner</span>
          <i class="fa fa-cog"></i>
        </li>
        <li class="list-group-item" data-section-type="Gallery Grid">
          <span>Gallery Grid</span>
          <small class="mr-3"
            >settings: "data source: Collection > gallery"</small
          >
          <i class="fa fa-cog"></i>
        </li>
        <li class="list-group-item" data-section-type="Freeform block">
          <span>Freeform block</span>
          <small class="mr-3">Dragula section (text and images)</small>
          <i class="fa fa-cog"></i>
        </li>
        <li
          class="list-group-item"
          data-section-type="Pre-made image text blocks"
        >
          <span>Pre-made image text blocks</span>
          <i class="fa fa-cog"></i>
        </li>
        <li class="list-group-item" data-section-type="Newsletter">
          <span>Newsletter</span>
          <i class="fa fa-cog"></i>
        </li>
        <li class="list-group-item" data-section-type="Classes">
          <span>Classes</span>
          <i class="fa fa-cog"></i>
        </li>
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

  .list-group-item {
    display: flex;
    span {
      display: inline-block;
      margin-right: auto;
    }
  }
</style>
