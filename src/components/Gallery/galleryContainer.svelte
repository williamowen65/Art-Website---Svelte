<script>
  import AddButton from "../General/addButton.svelte";
  import ImageType from "./ImageType.svelte";
  import Gallery from "./gallery.svelte";
</script>

<div class="galleryContainer">
  <span class="d-flex">
    <slot name="title" />

    <AddButton />
  </span>
  <Gallery>
    <slot name="images" />
  </Gallery>
</div>
