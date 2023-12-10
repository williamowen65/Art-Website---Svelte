<script>
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  import EditButton from "../General/editButton.svelte";
  import Modal from "../General/modal.svelte";
  import { onMount, afterUpdate } from "svelte";

  const { src } = $$props;
  const modalId = "createCollection";

  /**
   * @type {HTMLSelectElement}
   */
  let typeSelect;

  afterUpdate(() => {
    jQuery(typeSelect).select2();
  });
</script>

<div class="card">
  <EditButton contentType="collectionType" {modalId} />
  <img {src} alt="" />
  <div class="card-body d-flex flex-column">
    <div class="mt-2">
      <h5 class="card-title">Special title treatment</h5>
      <p class="card-text">
        With supporting text below as a natural lead-in to additional content.
      </p>
    </div>
  </div>
</div>

<Modal id={modalId} headerText="" showModal="true">
  <span slot="headerText">Edit collection type</span>
  <span slot="body">
    <div class="field">
      <label>Card Banner Image</label>
      <Dropzone />
    </div>
    <div class="field">
      <label for="">Type</label>
      <select bind:this={typeSelect} name="" id=""></select>
    </div>
  </span>
  <span slot="footer">
    <button class="btn btn-primary">Save</button>
  </span>
</Modal>

<style lang="scss">
  .card {
    cursor: pointer;
    /* width: 300px; */
    border-radius: 0;
    img {
      width: 100%;
    }
  }
</style>
