<script>
  // @ts-nocheck

  import EditButton from "../General/editButton.svelte";
  import Modal from "../General/modal.svelte";
  import { onMount } from "svelte";
  import { filesToSave, isLoggedIn } from "../../stores";
  import ThisDropzone from "../General/thisDropzone.svelte";
  import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
  import { storage } from "../../firebase";
  import { getUid } from "$lib/common";

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

  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";

  function updateBannerData(e) {
    const container = jQuery(e.target).closest(".modal");
    const urlsToSave = [];
    // save files in storage and get urls
    new Promise((res, rej) => {
      Object.values($filesToSave).forEach((obj) => {
        const file = obj.theFile;
        const galleryRef = ref(storage, file.name + `-${getUid()}`);
        uploadBytes(galleryRef, file)
          .then(async (snapshot) => {
            const url = await getDownloadURL(galleryRef);
            urlsToSave.push(url);
          })
          .then(() => res());
      });
    }).then(() => {
      // save banner document in db
      const description = container.find(".description").val();
      const showDescription = container
        .find(".showDescription")
        .prop("checked");
      console.log("updateBannerData", {
        urlsToSave,
        description,
        showDescription,
      });
    });

    // clear filesToSave
  }
</script>

<div class="jumbotron banner rounded-0">
  <div class={ifLoggedInClass}>
    <EditButton contentType="banner" {modalId} />
    <Modal id={modalId}>
      <span slot="headerText">Edit Banner</span>
      <span slot="body">
        <ThisDropzone />
        <div class="field">
          <label for="">Description</label>
          <textarea class="form-control description" rows="5"></textarea>
        </div>
        <div class="field">
          <div class="d-flex">
            <label for="" class="mr-3">Show Description</label>
            <input type="checkbox" class="showDescription" />
          </div>
        </div>
      </span>
      <span slot="footer">
        <button class="btn btn-primary" on:click={updateBannerData}>Save</button
        >
      </span>
    </Modal>
  </div>
</div>

<style lang="scss">
  .banner {
    position: relative;
    height: 80vh;
    background-image: url(https://media.istockphoto.com/id/638820708/photo/macro-close-up-of-different-color-oil-paint-colorful-acrylic.jpg?s=1024x1024&w=is&k=20&c=nkyJnt9CpserZ0a0BXqVM5p4xVH1ttWjtSiU_H6oZJ4=);
  }
</style>
