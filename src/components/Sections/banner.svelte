<script>
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  import EditButton from "../General/editButton.svelte";
  import Modal from "../General/modal.svelte";
  import { onMount } from "svelte";

  const modalId = "editBanner";
  const showModal = false;

  onMount(() => {
    if (showModal) {
      jQuery(`#${modalId}`).modal("show");
    }
    return () => {
      // Mostly for dev editing of component
      jQuery(`#${modalId}`).modal("hide");
    };
  });
</script>

<div class="jumbotron banner rounded-0">
  <EditButton contentType="banner" {modalId} />
  <Modal id={modalId} headerText="">
    <span slot="headerText">Edit Banner</span>
    <span slot="body">
      <Dropzone />
      <div class="field">
        <label for="">Description</label>
        <textarea class="form-control" rows="5"></textarea>
      </div>
      <div class="field">
        <div class="d-flex">
          <label for="" class="mr-3">Show Description</label>
          <input type="checkbox" class="" />
        </div>
      </div>
    </span>
    <span slot="footer">
      <button class="btn btn-primary">Save</button>
    </span>
  </Modal>
</div>

<style lang="scss">
  .banner {
    position: relative;
    height: 80vh;
    background-image: url(https://media.istockphoto.com/id/638820708/photo/macro-close-up-of-different-color-oil-paint-colorful-acrylic.jpg?s=1024x1024&w=is&k=20&c=nkyJnt9CpserZ0a0BXqVM5p4xVH1ttWjtSiU_H6oZJ4=);
  }
</style>
