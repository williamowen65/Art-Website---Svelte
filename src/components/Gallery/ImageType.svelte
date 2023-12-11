<script>
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  import EditButton from "../General/editButton.svelte";
  import Modal from "../General/modal.svelte";
  import { onMount, afterUpdate } from "svelte";
  import CommonCollectionType from "../Modals/commonCollectionType.svelte";
  import { isLoggedIn } from "../../stores";

  const { src } = $$props;
  const modalId = "editCollection";
  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";
</script>

<div class="card">
  <div class={ifLoggedInClass}>
    <EditButton contentType="collectionType" {modalId} />
  </div>
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

<div class={ifLoggedInClass}>
  <Modal id={modalId} showModal={false}>
    <span slot="headerText">Edit collection type</span>
    <span slot="body">
      <CommonCollectionType {modalId} />
    </span>
    <span slot="footer">
      <button class="btn btn-primary">Remove</button>
      <button class="btn btn-primary">Save</button>
    </span>
  </Modal>
</div>

<style lang="scss">
  .card {
    cursor: pointer;
    /* width: 300px; */
    border-radius: 0;
    height: 100%;
    img {
      width: 100%;
    }
  }
</style>
