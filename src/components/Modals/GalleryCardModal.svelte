<script>
  import { page } from "$app/stores";
  import { addPainting } from "$lib/writeData";
  import Modal from "../General/modal.svelte";
  import CommonPaintingModalBody from "./commonPaintingModalBody.svelte";
  const modalId = "test";
</script>

<!-- <div class=" position-absolute"> -->
<div class=" position-absolute">
  <Modal id={modalId} showModal={false}>
    <span slot="headerText">
      <h3>
        Edit {$page.route.id?.slice(1)}/<span class="collectionName"
          >{type}</span
        >
        type
      </h3>
    </span>
    <span slot="body">
      <CommonPaintingModalBody />
    </span>
    <span slot="footer">
      <button class="btn btn-primary">Remove</button>
      <button
        class="btn btn-primary saveBtn"
        on:click={() => addPainting(modalId, "edit", $page.route.id)}
        >Save</button
      >
    </span>
  </Modal>
</div>
