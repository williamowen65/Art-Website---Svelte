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

  onMount(() => {
    jQuery(`#${modalId}`).on("show.bs.modal", populateForm);
    return () => {};
  });

  function populateForm(e) {
    const container = jQuery(`#${modalId}`);
    console.log({ "container.data()": container.data() });
    const modal_galleryImageData = container.data("galleryImageData");

    console.log("populateForm with card info", {
      modal_galleryImageData,
      "e.target": e.target,
    });
    container.find(".imagePreview").attr("src", modal_galleryImageData.url);
    container.find(".description").val(modal_galleryImageData.description);
    container.find("select").val(modal_galleryImageData.type).trigger("change");
  }
  console.log({ galleryImageData });
  function setData(jQuerySelection) {
    console.log("setData", { galleryImageData });
    jQuerySelection.data("galleryImageData", galleryImageData);
  }
</script>

<div class="card" meta-page="src\components\Gallery\ImageType.svelte">
  <div class={ifLoggedInClass}>
    <EditButton contentType="collectionType" {modalId} {setData} />
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
