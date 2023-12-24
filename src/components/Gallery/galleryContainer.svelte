<script>
  import { isLoggedIn } from "../../stores";
  import AddButton from "../General/buttons/addButton.svelte";
  import ImageType from "./collectionCard.svelte";
  import Gallery from "./gallery.svelte";
</script>

<div class="galleryContainer">
  <span class="d-flex">
    <slot name="title" />
    {#if $isLoggedIn}
      <AddButton />
    {/if}
  </span>
  <Gallery>
    <slot name="images" />
  </Gallery>
</div>
