<script>
  import { page } from "$app/stores";
  import { addPainting } from "$lib/writeData";
  import { isLoggedIn } from "../../stores";
  import Modal from "../General/modal.svelte";
  import CommonPaintingModalBody from "./commonPaintingModalBody.svelte";
  const { modalId, type, collectionType, slug } = $$props;

  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";
</script>

<!-- <div class=" position-absolute"> -->
<div class="{ifLoggedInClass} position-absolute">
  <Modal id={modalId} showModal={false}>
    <span slot="headerText">
      <h3>
        Edit originals/<span class="collectionName">{collectionType}</span>{slug
          ? "/" + slug
          : ""}
      </h3>
    </span>
    <span slot="body">
      <CommonPaintingModalBody />
    </span>
    <span slot="footer">
      <button class="btn btn-primary">Remove</button>
      <button
        class="btn btn-primary saveBtn"
        on:click={() => addPainting(modalId, "edit", $page)}>Save</button
      >
    </span>
  </Modal>
</div>
