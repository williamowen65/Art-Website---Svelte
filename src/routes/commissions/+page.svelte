<script>
  // @ts-nocheck

  import EditButton from "../../components/General/editButton.svelte";
  import Modal from "../../components/General/modal.svelte";
  // import { db as fake_db } from "../../fakeData";
  import { marked } from "marked";
  import { isLoggedIn } from "../../stores";
  import { onMount } from "svelte";
  import { doc, onSnapshot, setDoc } from "firebase/firestore";
  import { db } from "../../firebase";
  import ImageSelection from "../../components/General/imageSelection.svelte";
  import ImageSelectionWithImageData from "../../components/General/imageSelectionWithImageData.svelte";
  const commissionText = "test";
  //   console.log({ commissionText });

  const modalId = "editTextModalId";
  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";

  const commissionsDoc = doc(db, "textContent", "commissions");
  let commissionsData = {};
  onSnapshot(commissionsDoc, (doc) => {
    console.log("Current data: ", doc.data());
    commissionsData = doc.data();
  });

  onMount(() => {
    jQuery(`#${modalId}`).on("show.bs.modal", populateForm);
    return () => {
      jQuery(`#${modalId}`).modal("hide");
    };
  });

  function populateForm() {
    const modal = jQuery(`#${modalId}`);
    // console.log("populateForm", { bannerData, modal, urlsToSave });
    modal.find(".description").val(commissionsData.description);
  }
  function saveCommissionsText(e) {
    console.log("saveCommissionsText", {});
    const container = jQuery(e.target).closest(".modal");
    const saveBtn = container.find(".saveBtn");
    const oldBtnText = jQuery(saveBtn).html();
    jQuery(saveBtn).html(`<i class="fa fa-spin fa-spinner"></i>`);
    const description = container.find(".description").val();
    const payload = {
      description,
    };
    setDoc(commissionsDoc, payload).then(() => {
      jQuery(`#${modalId}`).modal("hide");
      // // clear filesToSave
      container.find(".description").val("");
      jQuery(saveBtn).html(oldBtnText);
    });
  }

  function handleAddImage() {
    console.log("handleAddImage", {});
    // const imageSection = jQuery(`<div class="imageSection"></div>`);
    const currNumberImages = jQuery(".imagesContainer")
      .children()
      .toArray().length;
    const num = currNumberImages + 1;

    new ImageSelectionWithImageData({
      target: jQuery(".imagesContainer").get(0),
      props: {
        name: `image-${num}`,
        label: `Image ${num}`,
      },
    });
  }

  $: commissionsDescription = commissionsData.description || "";
</script>

<div class="container position-relative mt-5">
  <div class={ifLoggedInClass}>
    <EditButton {modalId} />
  </div>
  {@html marked(commissionsDescription)}
</div>

<div class={ifLoggedInClass}>
  <Modal id={modalId} showModal={true} classes="modal-lg">
    <span slot="headerText"> Edit Commissions Text</span>
    <span slot="body">
      <textarea
        class="w-100 form-control description"
        placeholder="Main Text Area"
      ></textarea>
      <button class="btn btn-secondary my-1 btn-sm" on:click={handleAddImage}
        >Add Image</button
      >
      <div class="imagesContainer"></div>
      <!-- <button
        class="btn btn-secondary my-1 btn-sm"
        on:click={handleAddImageSection}>Add Image Section</button
      >
      <div class="imageSection">
        <i class="fa-plus fa"></i>
        <ImageSelection />
      </div> -->
    </span>
    <span slot="footer">
      <button class="btn btn-primary saveBtn" on:click={saveCommissionsText}
        >Save</button
      >
    </span>
  </Modal>
</div>
