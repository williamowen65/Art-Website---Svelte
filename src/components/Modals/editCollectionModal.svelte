<script>
  import { deleteDoc } from "firebase/firestore";
  import Modal from "../General/modal.svelte";
  import CommonCollectionType from "./common/commonCollectionType.svelte";
  import { saveEditOfCollectionType } from "$lib/writeData";
  import { page } from "$app/stores";
  import { tags, modalIds } from "../../stores";
  const { editCollectionModalId: modalId } = modalIds;

  let removeCollectionBtn;

  function deleteCollection() {
    const isConfirmOpen = jQuery(removeCollectionBtn).attr("aria-describedby");
    if (isConfirmOpen) {
      const container = jQuery(`#${modalId}`);
      const modal_galleryImageData = container.data("galleryImageData");
      console.log("deleteCollection", {});
      const indexOfLastSlash = modal_galleryImageData.path.lastIndexOf("/");
      const collection = modal_galleryImageData.path.slice(0, indexOfLastSlash);
      const id = modal_galleryImageData.path.slice(indexOfLastSlash);
      const collectionTypeDoc = doc(db, collection, id);
      deleteDoc(collectionTypeDoc);
    }
  }
</script>

<div class=" position-absolute">
  <Modal id={modalId} showModal={false}>
    <span slot="headerText">
      <div class="d-flex">
        <span>
          <!-- Edit <span class="collectionName">{collectionName}</span> type -->
          Edit <span class="collectionName">"COLLECTION NAME"</span> type
        </span>
        <span></span>
      </div>
    </span>
    <span slot="body">
      <CommonCollectionType {modalId} />
    </span>
    <span slot="footer">
      <button
        class="btn btn-primary"
        bind:this={removeCollectionBtn}
        on:click={deleteCollection}
        data-toggle="confirmation"
        data-title="Are you sure?"
        data-content="This might be dangerous. This will remove pictures."
        >Remove</button
      >
      <button
        class="btn btn-primary saveBtn"
        on:click={() =>
          saveEditOfCollectionType(modalId, "edit", $page.route.id, $tags)}
        >Save</button
      >
    </span>
  </Modal>
</div>
