<script>
  // @ts-nocheck

  import { doc, onSnapshot, setDoc } from "firebase/firestore";
  import { isLoggedIn, newsletterData } from "../../stores";
  import EditButton from "../General/editButton.svelte";
  import Modal from "../General/modal.svelte";
  import { onMount } from "svelte";
  import { db } from "../../firebase";
  import { combineImgPayloadAsURL, saveImageAndGetUrl } from "$lib/common";
  import ImageSelection from "../General/imageSelection.svelte";

  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";
  const modalId = "editNewsletterText";
  // const newsletterText = fake_db.textContent.newsletterTitle;
  const newsletterDoc = doc(db, "textContent", "newsletter");

  onMount(() => {
    jQuery(`#${modalId}`).on("show.bs.modal", () => {
      const imgSrc = $newsletterData.backgroundPic;
      jQuery(".description").val($newsletterData.description);
      jQuery(".imagePreview").attr("src", imgSrc);
    });
    return () => {
      // Mostly for dev editing of component
      jQuery(`#${modalId}`).modal("hide");
    };
  });

  async function saveNewsletter(e) {
    const container = jQuery(e.target).closest(".modal");
    const saveBtn = container.find(".saveBtn");
    const oldBtnText = saveBtn.html();
    saveBtn.html(`<i class="fa fa-spin fa-spinner"></i>`);
    // save files in storage and get urls
    const description = container.find(".description").val();

    const payload = {
      description,
    };

    const files = await saveImageAndGetUrl(["backgroundPic"], modalId);
    combineImgPayloadAsURL(payload, files);

    // console.log({ files, payload });
    // debugger;
    setDoc(newsletterDoc, payload, { merge: true }).then(() => {
      jQuery(`#${modalId}`).modal("hide");
      // clear filesToSave
      container.find(".description").val("");
      jQuery(saveBtn).html(oldBtnText);
      // urlsToSave = [];
    });
  }

  $: newsletterText = $newsletterData.description || "";
  $: backgroundImage = $newsletterData.backgroundPic
    ? `background-image: url(${$newsletterData.backgroundPic});`
    : "";
  let hideAction = {
    remove: true,
  };
</script>

<div
  class="d-flex justify-content-center newsletter position-relative"
  style={backgroundImage}
>
  <div class={ifLoggedInClass}>
    <EditButton {modalId} {hideAction} />
  </div>
  <div class="container-md content-container">
    <div>{newsletterText}</div>
    <label for="">Name (required)</label>
    <div class="d-flex">
      <input
        class="form-control"
        type="text"
        placeholder="First Name"
        style="margin-left: 0;"
      />
      <input
        class="form-control"
        type="text"
        placeholder="Last Name"
        style="margin-right: 0;"
      />
    </div>
    <input class="form-control" type="text" placeholder="Email" />
    <textarea class="form-control" type="text" placeholder="Message" />
    <button class="btn send">Send</button>
  </div>
</div>

<Modal id={modalId} showModal={false}>
  <span slot="headerText"> Edit Section Header </span>
  <span slot="body">
    <input type="text" class="form-control w-100 description" />
    <div class="d-flex img-container">
      <ImageSelection
        name="backgroundPic"
        label="Background Pic"
        {hideAction}
      />
    </div>
  </span>
  <span slot="footer">
    <button class="btn btn-primary saveBtn" on:click={saveNewsletter}
      >Save</button
    >
  </span>
</Modal>

<style lang="scss">
  .container-md {
    max-width: 700px;
  }
  .newsletter {
    padding: 75px 0px;
    /* margin: 75px 0px 0px; */
    background-size: cover;
    :not(i, button) {
      /* color: white; */
    }
    height: 89vh;
    .content-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      align-self: center;
    }
    .send {
      align-self: stretch;
    }
    input,
    textarea {
      margin: 3px;
    }
  }
</style>
