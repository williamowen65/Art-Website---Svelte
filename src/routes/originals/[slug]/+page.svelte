<script>
  import EditButton from "../../../components/General/editButton.svelte";
  import Modal from "../../../components/General/modal.svelte";

  const modalId = "editImageDetailsModal";

  const hideAction = {
    remove: true,
  };
</script>

<div class="container mt-5 position-relative">
  <div class="row">
    <div class="col-6">
      <img src="https://placehold.co/600x600/png?text=Placeholder" alt="" />
    </div>
    <div class="col-6 content d-flex justify-content-center">content</div>
  </div>
  <EditButton {hideAction} {modalId} />
</div>

<Modal id={modalId}></Modal>

<style>
  img {
    width: 100%;
  }
</style>
