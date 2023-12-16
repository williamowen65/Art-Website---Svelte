<script>
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  import EditButton from "../General/editButton.svelte";
  import Modal from "../General/modal.svelte";
  import { onMount, afterUpdate } from "svelte";
  import CommonCollectionType from "../Modals/commonCollectionType.svelte";
  import { isLoggedIn } from "../../stores";

  const { galleryImageData } = $$props;
  const modalId = "editCollection";
  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";

  console.log({ galleryImageData });
</script>

<div class="card">
  <div class={ifLoggedInClass}>
    <EditButton contentType="collectionType" {modalId} />
  </div>
  <img src={galleryImageData?.url} alt="" />
  <div class="card-body d-flex flex-column">
    <div class="mt-2">
      <!-- {@html galleryImageData.description} -->
      <h5 class="card-title">{galleryImageData.type}</h5>
      <p class="card-text">
        <!-- {@debug galleryImageData} -->
        {galleryImageData.description}
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
