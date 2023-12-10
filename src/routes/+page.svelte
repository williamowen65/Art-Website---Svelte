<script>
  import Banner from "../components/Sections/banner.svelte";
  import Gallery from "../components/Gallery/gallery.svelte";
  import GalleryImage from "../components/Gallery/ImageType.svelte";
  import AddButton from "../components/General/addButton.svelte";
  import Modal from "../components/General/modal.svelte";
  import CommonCollectionType from "../components/Modals/commonCollectionType.svelte";

  const modalId = "createCollection";

  function openCreateCollectionModal() {
    console.log("openCreateCollectionModal", {});
  }
</script>

<Banner />
<div class="container">
  <div class="galleryContainer">
    <span class="d-flex">
      <h2 class="collectionName">Originals</h2>
      <AddButton {modalId} />
    </span>
    <Gallery>
      <GalleryImage
        src="https://media.istockphoto.com/id/1150481340/vector/realistic-mountains-landscape-morning-wood-panorama-pine-trees-and-mountains-silhouettes.jpg?s=1024x1024&w=is&k=20&c=EAoY9ekkKfhIgNmAuCDhQuk-F7hDFhyhk0cixjF53ts="
      />
      <GalleryImage
        src="https://media.istockphoto.com/id/1125945611/vector/rural-landscape-mountains-hills-fields-nature-background.jpg?s=1024x1024&w=is&k=20&c=ZChyXDpqa-MkxZBQPzelykh834SkTbecVvmrjoZNdt8="
      />
      <GalleryImage
        src="https://media.istockphoto.com/id/1318863607/photo/multicolored-leaves.jpg?s=1024x1024&w=is&k=20&c=W4ndHjuo2zMfoi_ZQ55DYOvYOvNm4ZLAv0-r9EejnXg="
      />
    </Gallery>
  </div>
  <div class="galleryContainer">
    <span class="d-flex">
      <h2 class="collectionName">Reproductions</h2>
      <AddButton {modalId} />
    </span>
    <Gallery>
      <GalleryImage
        src="https://media.istockphoto.com/id/1150481340/vector/realistic-mountains-landscape-morning-wood-panorama-pine-trees-and-mountains-silhouettes.jpg?s=1024x1024&w=is&k=20&c=EAoY9ekkKfhIgNmAuCDhQuk-F7hDFhyhk0cixjF53ts="
      />
      <GalleryImage
        src="https://media.istockphoto.com/id/1125945611/vector/rural-landscape-mountains-hills-fields-nature-background.jpg?s=1024x1024&w=is&k=20&c=ZChyXDpqa-MkxZBQPzelykh834SkTbecVvmrjoZNdt8="
      />
      <GalleryImage
        src="https://media.istockphoto.com/id/1318863607/photo/multicolored-leaves.jpg?s=1024x1024&w=is&k=20&c=W4ndHjuo2zMfoi_ZQ55DYOvYOvNm4ZLAv0-r9EejnXg="
      />
    </Gallery>
  </div>

  <div class="classes">
    <h2>Classes</h2>
  </div>
</div>

<Modal id={modalId} showModal={false}>
  <span slot="headerText">Create <span class="collectionName"></span> type</span
  >
  <span slot="body">
    <CommonCollectionType {modalId} />
  </span>
  <span slot="footer">
    <button class="btn btn-primary">Save</button>
  </span>
</Modal>

<style>
  .galleryContainer {
    margin: 100px 0px;
  }
</style>
