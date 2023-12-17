<script>
  import { addPainting } from "$lib/writeData";
  import Modal from "../General/modal.svelte";
  import CommonPaintingModalBody from "./commonPaintingModalBody.svelte";
  const modalId = "test";
</script>

<!-- <div class=" position-absolute"> -->
<div class=" position-absolute">
  <Modal id={modalId} showModal={false}>
    <!-- <span slot="headerText">
      Edit <span class="collectionName">{collectionNam}</span>
      type</span
    > -->
    <span slot="headerText">
      Edit <span class="collectionName">type</span>
      type</span
    >
    <span slot="body">
      <CommonPaintingModalBody />
    </span>
    <span slot="footer">
      <button class="btn btn-primary">Remove</button>
      <button
        class="btn btn-primary saveBtn"
        on:click={() => addPainting(modalId)}>Save</button
      >
    </span>
  </Modal>
</div>
