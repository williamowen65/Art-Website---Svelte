<script>
  import Banner from "../components/Sections/banner.svelte";
  import Gallery from "../components/Gallery/gallery.svelte";
  import GalleryImage from "../components/Gallery/ImageType.svelte";
  import AddButton from "../components/General/addButton.svelte";
  import Modal from "../components/General/modal.svelte";
  import CommonCollectionType from "../components/Modals/commonCollectionType.svelte";
  import ClassesProxy from "./classes/classesProxy.svelte";
  import { db as fake_db } from "../fakeData";
  import AddClassModal from "./classes/addClassModal.svelte";

  // import "$lib/firebase";

  const createCollectionModalId = "createCollection";
  const createClassModalId = "createClass";

  function openCreateCollectionModal() {
    console.log("openCreateCollectionModal", {});
  }
  const collections = Object.entries(fake_db.collections);
</script>

<Banner />
<div class="container">
  {#each collections as [title, colData]}
    <div class="galleryContainer">
      <span class="d-flex">
        <h2 class="collectionName">{title}</h2>
        <AddButton modalId={createCollectionModalId} />
      </span>
      <Gallery>
        {#each Object.entries(colData) as [id, { imgUrl }]}
          <GalleryImage src={imgUrl} />
        {/each}
      </Gallery>
    </div>
  {/each}

  <div class="classes">
    <span class="d-flex">
      <h2>Classes</h2>
      <AddButton modalId={createClassModalId} />
    </span>
    <ClassesProxy />
  </div>
</div>

<Modal id={createCollectionModalId} showModal={false}>
  <span slot="headerText">Create <span class="collectionName"></span> type</span
  >
  <span slot="body">
    <CommonCollectionType modalId={createCollectionModalId} />
  </span>
  <span slot="footer">
    <button class="btn btn-primary">Save</button>
  </span>
</Modal>

<AddClassModal id={createClassModalId} showModal={false} />

<style>
  .galleryContainer {
    margin: 100px 0px;
  }
</style>
