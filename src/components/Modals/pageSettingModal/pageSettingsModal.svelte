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
      <ul class="list-group" id="sections">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
        <li class="list-group-item">A fourth item</li>
        <li class="list-group-item">And a fifth one</li>
      </ul>
    </div>
  </span>
  <span
    slot="footer"
    class="d-flex align-items-baseline justify-content-between"
  >
    <p>stats</p>
    <button class="btn btn-primary">save</button>
  </span>
</Modal>

<style>
  :global(.pageSettings .modal-body) {
    padding-top: 0;
  }
  h3 {
    height: 37px;
  }
</style>
