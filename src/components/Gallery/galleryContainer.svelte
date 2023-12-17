<script>
  import { isLoggedIn } from "../../stores";
  import AddButton from "../General/addButton.svelte";
  import ImageType from "./collectionCard.svelte";
  import Gallery from "./gallery.svelte";
  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";
  // console.log({ ifLoggedInClass });
</script>

<div class="galleryContainer">
  <span class="d-flex">
    <slot name="title" />
    <div class={ifLoggedInClass}>
      <AddButton />
    </div>
  </span>
  <Gallery>
    <slot name="images" />
  </Gallery>
</div>
